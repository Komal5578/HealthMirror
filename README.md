# HealthMirror 🏥

Your personal health companion that transforms your health journey with personalized plans, intelligent tracking, and meaningful progress.

## Features

- 🎯 **Personalized Health Plans** - Customized plans based on your health goals
- 📊 **Health Predictions** - AI-powered predictions for your health outcomes
- 💬 **AI Health Advisor (TwinX)** - Chat with your personal health companion
- 📈 **Progress Tracking** - Track tasks, streaks, and health metrics
- 🔄 **Multi-API Support** - Automatic API key rotation for reliability
- 🎮 **Gamification** - Earn streaks and level up your health journey

## Tech Stack

- **Frontend**: Next.js 16.1.4, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 2.5 Flash API
- **Database**: Firebase
- **Email**: Resend
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account
- Google Gemini API key
- Resend API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Komal5578/HealthMirror.git
cd HealthMirror
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with:
```dotenv
GEMINI_API_KEYS=["YOUR_GEMINI_API_KEY"]
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_NAME=Healthcare Twin
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Setup

### Vercel Deployment

When deploying to Vercel, add all environment variables in:
1. Project Settings → Environment Variables
2. Add each variable from `.env`
3. Select appropriate environments (Production, Preview, Development)
4. Redeploy the project

### API Keys

- **Gemini API**: Get from [Google AI Studio](https://aistudio.google.com)
- **Firebase**: Set up at [Firebase Console](https://console.firebase.google.com)
- **Resend**: Sign up at [Resend.com](https://resend.com)

## Project Structure

```
HealthMirror/
├── app/
│   ├── api/
│   │   ├── chat/route.js          # Chat API with TwinX
│   │   └── predict-health/route.js # Health prediction API
│   ├── components/
│   │   └── WelcomeScreen.js       # Welcome page
│   ├── lib/
│   │   └── geminiKeyManager.js    # API key rotation manager
│   └── store/
│       └── useStore.js             # State management
├── public/
│   ├── logo-m.svg
│   └── healthmirrorbg.mp4
├── .env                            # Environment variables
└── package.json
```

## Key Features Explained

### Health Prediction
- Uses AI to predict health outcomes based on completion rate and goals
- Falls back to rule-based predictions if AI is unavailable
- Supports multiple health goals (muscle gain, weight loss, cardio health, etc.)

### Chat with TwinX
- Personalized health advisor powered by Gemini 2.5 Flash
- Context-aware responses based on user's health data
- Automatic API key rotation for rate limit handling

### API Key Management
- Automatic rotation between multiple Gemini API keys
- Error tracking and fallback mechanisms
- Statistics on key usage

## API Endpoints

### POST `/api/chat`
Send a message to TwinX with optional health context.

**Request:**
```json
{
  "message": "How can I improve my fitness?",
  "context": {
    "healthGoal": "muscle_gain",
    "completionRate": 85,
    "userAge": 25
  }
}
```

### POST `/api/predict-health`
Get AI-powered health predictions for future years.

**Request:**
```json
{
  "healthGoal": "weight_loss",
  "completionRate": 75,
  "healthScore": 70,
  "streakDays": 15,
  "currentDay": 10,
  "vitalSigns": {
    "heartHealth": 80,
    "muscleStrength": 65,
    "flexibility": 70,
    "mentalWellness": 75,
    "energyLevel": 80
  },
  "userAge": 30,
  "years": 5
}
```

## Development

### Build for production
```bash
npm run build
```

### Run tests
```bash
npm test
```

### Format code
```bash
npm run format
```

## Troubleshooting

### Build Error: "GEMINI_API_KEYS is not valid JSON"
- Ensure `.env` has proper formatting: `GEMINI_API_KEYS=["YOUR_KEY"]`
- For Vercel, add the raw JSON string in Environment Variables

### Chat API returns empty response
- Check if Gemini API key is valid
- Verify API key hasn't hit rate limits
- Check Gemini API quota in Google Cloud Console

### Firebase authentication issues
- Verify Firebase config in `.env`
- Ensure Firebase project is active
- Check Firebase rules allow your domain

## Security Notes

⚠️ **IMPORTANT**: Never commit `.env` files with real API keys to version control.

- `.env` is listed in `.gitignore`
- Store production secrets in Vercel Environment Variables
- Rotate API keys regularly
- Never share your API keys publicly

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact & Support

- **GitHub**: [Komal5578/HealthMirror](https://github.com/Komal5578/HealthMirror)
- **Email**: Support email here
- **Issues**: Report bugs via GitHub Issues

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with wearables (Fitbit, Apple Watch)
- [ ] Nutrition tracking
- [ ] Video workout guides
- [ ] Community features

---

**Made with ❤️ for better health**
