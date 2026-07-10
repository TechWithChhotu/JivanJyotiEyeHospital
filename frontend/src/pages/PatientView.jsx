import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function PatientView() {
  const { myTokenNumber } = useParams();
  const [currentLiveToken, setCurrentLiveToken] = useState(null);
  const [avgWaitTime, setAvgWaitTime] = useState(12);
  const [dynamicWaitTime, setDynamicWaitTime] = useState(12);

  const DEFAULT_DOCTOR = "Main Doctor";
  const myToken = parseInt(myTokenNumber) || 0;

  // 🔢 रिफ्रेश-प्रूफ गतिशील समय की गणना करने वाला मास्टर फंक्शन
  const calculateRealisticTime = (
    liveToken,
    averageTime,
    entryTimeStr,
    serverTimeStr,
  ) => {
    const activeLive = parseInt(liveToken);
    if (isNaN(activeLive) || activeLive === 0 || activeLive === myToken)
      return 0;

    if (activeLive < myToken) {
      const ahead = myToken - activeLive - 1; // कतार में आगे बचे मरीज
      const baseWaitingTime = averageTime + ahead * averageTime; // कुल शुरुआती बेस समय

      // ⏱️ सर्वर और एंट्री टाइम के आधार पर बीते हुए मिनट निकालें
      if (entryTimeStr) {
        const entryTime = new Date(entryTimeStr);
        const refTime = serverTimeStr ? new Date(serverTimeStr) : new Date();

        // मिलीसेकंड को मिनट में बदलें
        const diffMs = Math.max(0, refTime.getTime() - entryTime.getTime());
        const minutesElapsed = Math.floor(diffMs / 60000);

        // बेस समय में से बीते हुए समय को घटा दें
        return Math.max(1, baseWaitingTime - minutesElapsed);
      }

      return baseWaitingTime;
    }

    return 0; // बारी छूट जाने पर
  };

  const fetchQueueStatus = async () => {
    try {
      const currentRes = await axios.get(
        `http://localhost:5000/api/queue/current-patient?doctorName=${DEFAULT_DOCTOR}`,
      );

      const analyticsRes = await axios.get(
        `http://localhost:5000/api/queue/analytics/waiting-time?doctorName=${DEFAULT_DOCTOR}`,
      );

      const latestAvgTime = analyticsRes.data.averageWaitingTimeMinutes || 12;
      setAvgWaitTime(latestAvgTime);

      if (currentRes.data && currentRes.data.tokenNumber) {
        const liveToken = parseInt(currentRes.data.tokenNumber);
        setCurrentLiveToken(liveToken);

        // 🎯 फिक्स: यहाँ पर हम एंट्री टाइम कैलकुलेशन पास कर रहे हैं ताकि रिफ्रेश के बाद भी पुराना समय न दिखे
        const computedTime = calculateRealisticTime(
          liveToken,
          latestAvgTime,
          currentRes.data.entryTime,
          currentRes.data.currentTime,
        );
        setDynamicWaitTime(computedTime);
      } else {
        setCurrentLiveToken(0);
        setDynamicWaitTime(
          calculateRealisticTime(0, latestAvgTime, null, null),
        );
      }
    } catch (err) {
      console.error("कतार डेटा फ़ेच त्रुटि:", err);
      setCurrentLiveToken(0);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
    socket.emit("join_doctor_room", DEFAULT_DOCTOR);

    socket.on("queue_updated", () => {
      // सॉकेट आते ही पूरी स्थिति दोबारा लाइव फ़ेच करें
      fetchQueueStatus();
    });

    return () => {
      socket.off("queue_updated");
    };
  }, [myToken]);

  // 🔄 लाइव काउंटडाउन टाइमर जो ओपन स्क्रीन पर हर मिनट 1 मिनट घटाता रहेगा
  useEffect(() => {
    if (
      currentLiveToken === null ||
      currentLiveToken === 0 ||
      currentLiveToken >= myToken ||
      dynamicWaitTime <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      setDynamicWaitTime((prevTime) => (prevTime > 1 ? prevTime - 1 : 1));
    }, 60000);

    return () => clearInterval(interval);
  }, [currentLiveToken, myToken, dynamicWaitTime]);

  let tokensAhead = 0;
  let isMyTurn = false;

  if (currentLiveToken !== null) {
    if (currentLiveToken === myToken) {
      isMyTurn = true;
    } else if (currentLiveToken < myToken) {
      tokensAhead = myToken - currentLiveToken - 1;
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans">
      <div className="p-4 flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-blue-900 text-white p-6 text-center">
            <h2 className="text-xl font-black">🏥 जीवन ज्योति आँख अस्पताल</h2>
            <p className="text-xs text-blue-200 mt-1">लाइव कतार ट्रैकिंग</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <span className="text-xs bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full font-bold uppercase tracking-wide">
                👁️ मुख्य परामर्श कक्ष (MAIN CABIN)
              </span>
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 text-center">
              <h4 className="text-sm font-bold text-rose-800 uppercase tracking-wider">
                अभी डॉक्टर केबिन के अंदर हैं
              </h4>
              <h1 className="text-6xl font-black text-rose-600 mt-2">
                {currentLiveToken === null ? (
                  <span className="text-2xl text-slate-400 animate-pulse">
                    লোড हो रहा है...
                  </span>
                ) : currentLiveToken === 0 ? (
                  <span className="text-4xl text-slate-500 font-bold">
                    कोई नहीं 😴
                  </span>
                ) : (
                  `#${currentLiveToken}`
                )}
              </h1>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3 text-slate-700">
              <div className="flex justify-between items-center border-b border-blue-200/50 pb-2">
                <span className="font-medium">आपका टोकन नंबर:</span>
                <span className="text-xl font-black text-blue-900">
                  #{myTokenNumber}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-blue-200/50 pb-2">
                <span className="font-medium">आपसे आगे प्रतीक्षा में:</span>
                <span
                  className={`text-lg font-bold ${isMyTurn ? "text-emerald-600 animate-pulse" : "text-slate-900"}`}
                >
                  {currentLiveToken === null
                    ? "..."
                    : isMyTurn
                      ? "🎉 आपकी बारी आ गई! अंदर जाएं"
                      : currentLiveToken > myToken
                        ? "⏱️ आपकी बारी छूट गई है!"
                        : tokensAhead > 0
                          ? `${tokensAhead} मरीज`
                          : "0 मरीज (आप अगले हैं)"}
                </span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="font-medium">अनुमानित प्रतीक्षा समय:</span>
                <span className="text-lg font-bold text-emerald-600">
                  {currentLiveToken === null
                    ? "..."
                    : isMyTurn || currentLiveToken > myToken
                      ? "0 मिनट"
                      : `~${dynamicWaitTime} मिनट`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center py-4 text-xs text-slate-400">
        कृपया केबिन के बाहर भीड़ न लगाएं। सुरक्षित रहें।
      </footer>
    </div>
  );
}

export default PatientView;
