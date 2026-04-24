import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Faces of Democracy": "Faces of Democracy",
      "Democracy is Diversity": "Democracy is Diversity",
      "Every Age Matters": "Every Age Matters",
      "Find Your Booth": "Find Your Booth",
      "Sign in with Google": "Sign in with Google",
      "Play Story Mode": "Play Story Mode",
      "EVM Simulator": "EVM Simulator",
      "Learn to Vote": "Learn to Vote",
      "Welcome": "Welcome",
      "Welcome, Guest!": "Welcome, Guest!",
      "Cinematic Story": "Cinematic Story",
      "Quick Learn": "Quick Learn",
      "AI Assistant": "AI Assistant",
      "Find Booth": "Find Booth",
      "What-If Scenarios": "What-If Scenarios",
      "Voice Guide": "Voice Guide",
      "Your cinematic journey through the world's largest democracy. Learn, simulate, and understand the power of your vote.": "Your cinematic journey through the world's largest democracy. Learn, simulate, and understand the power of your vote.",
      "READY FOR VOTE": "READY FOR VOTE",
      "Press any party button to cast your vote": "Press any party button to cast your vote",
      "You have already voted!": "You have already voted!",
      "Each citizen gets one vote per election.": "Each citizen gets one vote per election.",
      "SELECTED:": "SELECTED:",
      "Confirming vote...": "Confirming vote...",
      "VOTE RECORDED": "VOTE RECORDED",
      "You voted for:": "You voted for:",
      "Thank you for participating!": "Thank you for participating!",
      "Experience the Electronic Voting Machine — exactly as it works in real elections": "Experience the Electronic Voting Machine — exactly as it works in real elections",
      "Reset Simulator": "Reset Simulator",
      "VVPAT Verification": "VVPAT Verification",
      "In a real election, a VVPAT slip showing your selected candidate is displayed for 7 seconds — allowing you to verify your vote was recorded correctly.": "In a real election, a VVPAT slip showing your selected candidate is displayed for 7 seconds — allowing you to verify your vote was recorded correctly."
    }
  },
  hi: {
    translation: {
      "Faces of Democracy": "लोकतंत्र के चेहरे",
      "Democracy is Diversity": "लोकतंत्र विविधता है",
      "Every Age Matters": "हर उम्र मायने रखती है",
      "Find Your Booth": "अपना बूथ खोजें",
      "Sign in with Google": "Google से साइन इन करें",
      "Play Story Mode": "स्टोरी मोड खेलें",
      "EVM Simulator": "EVM सिम्युलेटर",
      "Learn to Vote": "वोट देना सीखें",
      "Welcome": "स्वागत है",
      "Welcome, Guest!": "अतिथि, आपका स्वागत है!",
      "Cinematic Story": "सिनेमाई कहानी",
      "Quick Learn": "त्वरित सीख",
      "AI Assistant": "AI सहायक",
      "Find Booth": "बूथ खोजें",
      "What-If Scenarios": "क्या-अगर परिदृश्य",
      "Voice Guide": "आवाज़ मार्गदर्शक",
      "Your cinematic journey through the world's largest democracy. Learn, simulate, and understand the power of your vote.": "दुनिया के सबसे बड़े लोकतंत्र के माध्यम से आपकी सिनेमाई यात्रा। सीखें, अनुकरण करें, और अपने वोट की शक्ति को समझें।",
      "READY FOR VOTE": "वोट के लिए तैयार",
      "Press any party button to cast your vote": "अपना वोट डालने के लिए किसी भी पार्टी का बटन दबाएं",
      "You have already voted!": "आप पहले ही वोट दे चुके हैं!",
      "Each citizen gets one vote per election.": "प्रत्येक नागरिक को प्रति चुनाव एक वोट मिलता है।",
      "SELECTED:": "चयनित:",
      "Confirming vote...": "वोट की पुष्टि हो रही है...",
      "VOTE RECORDED": "वोट दर्ज किया गया",
      "You voted for:": "आपने वोट दिया है:",
      "Thank you for participating!": "भाग लेने के लिए धन्यवाद!",
      "Experience the Electronic Voting Machine — exactly as it works in real elections": "इलेक्ट्रॉनिक वोटिंग मशीन का अनुभव करें - बिल्कुल वैसे ही जैसे यह वास्तविक चुनावों में काम करती है",
      "Reset Simulator": "सिम्युलेटर रीसेट करें",
      "VVPAT Verification": "VVPAT सत्यापन",
      "In a real election, a VVPAT slip showing your selected candidate is displayed for 7 seconds — allowing you to verify your vote was recorded correctly.": "वास्तविक चुनाव में, आपके चयनित उम्मीदवार को दिखाने वाली एक VVPAT पर्ची 7 सेकंड के लिए प्रदर्शित की जाती है - जिससे आप सत्यापित कर सकते हैं कि आपका वोट सही ढंग से दर्ज किया गया था।"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
