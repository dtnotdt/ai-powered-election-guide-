/**
 * Application-wide constants for VoteVerse India.
 * Centralizes colors, party data, knowledge base, and configuration.
 */

export const COLORS = {
  saffron: '#FF9933',
  white: '#FFFFFF',
  green: '#138808',
  navy: '#000080',
  purple: '#7c3aed',
  pink: '#ec4899',
  cyan: '#06b6d4',
  orange: '#f97316',
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
};

export const PARTIES = [
  { id: 'party-a', name: 'Bharatiya Vikas Party', symbol: '🌸', color: '#FF9933', shortName: 'BVP' },
  { id: 'party-b', name: 'Jan Pragati Dal', symbol: '🖐️', color: '#138808', shortName: 'JPD' },
  { id: 'party-c', name: 'Rashtriya Ekta Morcha', symbol: '⚡', color: '#000080', shortName: 'REM' },
  { id: 'nota', name: 'NOTA', symbol: '🚫', color: '#6b7280', shortName: 'NOTA' },
];

export const CHECKLIST_ITEMS = [
  { key: 'register', icon: '📝', text: 'Register as Voter', description: 'Ensure your name is on the electoral roll' },
  { key: 'checkId', icon: '🪪', text: 'Verify Voter ID', description: 'Check your EPIC card or alternative ID' },
  { key: 'findBooth', icon: '📍', text: 'Find Polling Booth', description: 'Locate your assigned polling station' },
  { key: 'vote', icon: '🗳️', text: 'Cast Your Vote', description: 'Exercise your democratic right' },
];

export const BADGE_LIST = [
  { key: 'firstStep', icon: '🎯', name: 'First Step', desc: 'Started your voting journey' },
  { key: 'learner', icon: '📚', name: 'Quick Learner', desc: 'Learned about voting process' },
  { key: 'voter', icon: '🗳️', name: 'Voter', desc: 'Completed EVM simulation' },
  { key: 'expert', icon: '👑', name: 'Democracy Expert', desc: 'Completed all modules' },
];

export const KNOWLEDGE_BASE = {
  register: 'To register as a voter:\n1. Visit the NVSP website (nvsp.in)\n2. Fill out Form 6 online\n3. Upload documents — Age proof, Address proof, Photo\n4. Submit online or at nearest ERO office\n5. You must be 18+ on the qualifying date (Jan 1)',
  'voter id': 'EPIC (Voter ID Card) is issued by the Election Commission of India. Apply online through the NVSP portal. Processing takes 2–4 weeks. You can also vote using Aadhaar, Passport, or Driving License as alternative ID.',
  'polling booth': 'Find your polling booth:\n1. Visit nvsp.in\n2. Enter your EPIC number or personal details\n3. Get booth address and map directions\n4. You can also SMS your EPIC number to 1950 or 51969',
  evm: 'The Electronic Voting Machine (EVM) consists of:\n✅ Control Unit — operated by the polling officer\n✅ Ballot Unit — where you press the button\n\nEVMs are tamper-proof, store votes securely, and enable faster, more accurate counting.',
  vote: 'The voting process:\n1. Go to your assigned polling booth on election day\n2. Present a valid photo ID\n3. Get indelible ink mark on your finger\n4. Enter the voting compartment\n5. Press the button next to your chosen candidate on the EVM\n6. Verify via VVPAT slip\n7. Exit — your vote is secret!',
  age: 'You must be 18 years old on the qualifying date (usually January 1st of the year) to register as a voter. There is no upper age limit for voting.',
  documents: 'Documents required for voter registration:\n📄 Age Proof: Birth certificate, School leaving certificate, Passport\n📄 Address Proof: Aadhaar card, Utility bill, Rent agreement\n📸 Recent passport-size photograph',
  nota: 'NOTA stands for "None Of The Above."\nIf you do not wish to vote for any candidate, you can choose NOTA on the EVM. It\'s your democratic right to reject all candidates. NOTA votes are counted but do not affect the election outcome.',
  vvpat: 'VVPAT (Voter Verifiable Paper Audit Trail) is a printer attached to the EVM. After you vote, a paper slip with the candidate\'s name and symbol is displayed for 7 seconds. This allows you to verify your vote was recorded correctly.',
};

export const REELS_DATA = [
  {
    title: 'The Power of Your Vote',
    text: 'India has 960+ million eligible voters — the largest electorate in the world. Your single vote can decide the fate of an entire constituency.',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    icon: '🗳️',
    stat: '960M+',
    statLabel: 'Eligible Voters',
  },
  {
    title: 'Inside the EVM',
    text: 'The Electronic Voting Machine has two units: the Control Unit (with the officer) and the Ballot Unit (where you vote). Each EVM can record up to 3,840 votes.',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    icon: '⚙️',
    stat: '3,840',
    statLabel: 'Votes per EVM',
  },
  {
    title: 'Margins That Matter',
    text: 'In 2019, multiple constituencies were won by fewer than 500 votes. In 2004, a seat was won by just 1 vote. Every ballot shapes the nation.',
    gradient: 'linear-gradient(135deg, #0d1b2a, #1b263b, #415a77)',
    icon: '💪',
    stat: '1',
    statLabel: 'Vote Can Decide',
  },
  {
    title: 'Democracy at Scale',
    text: '1 million+ polling stations. 15 million+ election officials. 5 million+ EVMs. The largest democratic exercise in human history, every 5 years.',
    gradient: 'linear-gradient(135deg, #1b0a28, #2d1f3d, #4a1942)',
    icon: '🇮🇳',
    stat: '1M+',
    statLabel: 'Polling Stations',
  },
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

// Mock polling booth data for major cities
export const POLLING_BOOTHS = {
  'delhi': [
    { name: 'Govt. Boys Sr. Sec. School', address: 'Connaught Place, New Delhi', distance: '1.2 km', lat: 28.6315, lng: 77.2167 },
    { name: 'Community Centre Hall', address: 'Karol Bagh, New Delhi', distance: '3.4 km', lat: 28.6538, lng: 77.1888 },
    { name: 'Kendriya Vidyalaya', address: 'Dwarka Sector 12, New Delhi', distance: '5.1 km', lat: 28.5823, lng: 77.0500 },
  ],
  'mumbai': [
    { name: 'Municipal School No. 4', address: 'Andheri West, Mumbai', distance: '0.8 km', lat: 19.1364, lng: 72.8296 },
    { name: 'Dadar Community Hall', address: 'Dadar, Mumbai', distance: '2.5 km', lat: 19.0178, lng: 72.8478 },
    { name: 'Bandra Public Library', address: 'Bandra West, Mumbai', distance: '4.2 km', lat: 19.0596, lng: 72.8295 },
  ],
  'bangalore': [
    { name: 'Govt. High School', address: 'Koramangala, Bangalore', distance: '1.5 km', lat: 12.9352, lng: 77.6245 },
    { name: 'BBMP Community Hall', address: 'Indiranagar, Bangalore', distance: '2.8 km', lat: 12.9784, lng: 77.6408 },
  ],
  'chennai': [
    { name: 'Corporation School', address: 'T. Nagar, Chennai', distance: '1.1 km', lat: 13.0418, lng: 80.2341 },
    { name: 'Community Service Centre', address: 'Anna Nagar, Chennai', distance: '3.6 km', lat: 13.0850, lng: 80.2101 },
  ],
  'kolkata': [
    { name: 'Ward No. 7 School', address: 'Salt Lake, Kolkata', distance: '1.9 km', lat: 22.5726, lng: 88.3639 },
    { name: 'Municipal Hall', address: 'Park Street, Kolkata', distance: '2.4 km', lat: 22.5454, lng: 88.3515 },
  ],
  'hyderabad': [
    { name: 'Govt. Junior College', address: 'Ameerpet, Hyderabad', distance: '1.3 km', lat: 17.4375, lng: 78.4483 },
    { name: 'GHMC Community Hall', address: 'Kukatpally, Hyderabad', distance: '4.7 km', lat: 17.4947, lng: 78.3996 },
  ],
  default: [
    { name: 'Local Govt. School', address: 'Near Town Hall', distance: '1.5 km', lat: 20.5937, lng: 78.9629 },
    { name: 'Community Centre', address: 'Main Road', distance: '3.0 km', lat: 20.5937, lng: 78.9629 },
  ],
};

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'voteverse-demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'voteverse-demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'voteverse-demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000',
};

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
