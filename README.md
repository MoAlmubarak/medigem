# MediGem 💊

**Know Your Medicine - OTC Drug Side Effects & Interactions**

MediGem is a modern web application that helps users understand Over-the-Counter (OTC) medication side effects and interactions through an intuitive chatbot interface. Built with React and Node.js, it leverages the OpenFDA API to provide reliable, up-to-date medication information.

## ✨ Features

### Core Functionality
- **🤖 Interactive Chat Interface**: Conversational UI for easy medication queries
- **💊 Comprehensive Drug Information**: Access to detailed side effect data from OpenFDA
- **📊 Categorized Information**: Organized display of common, serious side effects and interactions
- **🔍 Smart Search**: Auto-complete and search history for a better user experience
- **⚡ Real-time Results**: Fast, responsive medication lookups

### Technical Features
- **📱 Responsive Design**: Mobile-first approach with modern UI/UX
- **🔄 Real-time Updates**: Optimistic UI updates with loading states
- **💾 Search History**: Persistent search history using localStorage
- **📖 API Documentation**: Built-in Swagger documentation
- **🔧 Error Handling**: Comprehensive error handling and user feedback
- **♿ Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MoAlmubarak/medigem.git
   cd medigem
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

3. **Configure environment variables** (optional)
   ```bash
   # Edit server/.env
   FDA_API_KEY=your_api_key_here  # Optional: Get from https://open.fda.gov/apis/authentication/
   PORT=3001
   NODE_ENV=development
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   ```

5. **Start the development servers**

   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm start
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:3001/api/docs

## 🏗️ Project Structure

```
medigem/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── common/    # Generic UI components
│   │   │   └── layout/    # Layout components
│   │   ├── features/      # Feature-specific components
│   │   │   ├── chat/      # Chat interface
│   │   │   ├── medication/# Medication display components
│   │   │   └── docs/      # API documentation
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS styles
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── package.json
└── README.md
```

## 🔌 API Usage

### Basic Medication Search
```bash
GET /api/medications/{drugName}
```

**Example:**
```bash
curl http://localhost:3001/api/medications/ibuprofen
```

**Response:**
```json
{
  "drugInfo": {
    "brandName": "Advil",
    "genericName": "Ibuprofen",
    "lastUpdated": "20220301"
  },
  "sideEffects": {
    "common": ["Nausea", "Dizziness", "Headache"],
    "serious": ["Allergic reaction", "Difficulty breathing"]
  },
  "guidance": {
    "whenToConsult": "Contact a healthcare provider if symptoms persist..."
  }
}
```

## 🛠️ Technology Stack

### Frontend
- **React 18+** - Modern React with hooks and context
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with CSS custom properties

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for OpenFDA API
- **Swagger** - API documentation
- **Express Validator** - Input validation

### External APIs
- **OpenFDA Drug Label API** - Medication data source
- **Rate Limiting** - 240 requests/minute (unauthenticated)

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

### Manual Testing
1. Search for common medications: "Ibuprofen", "Tylenol", "Aspirin"
2. Test error handling with invalid names
3. Verify responsive design on different screen sizes
4. Check search history functionality

## ⚠️ Important Disclaimers

- **Educational Purpose Only**: This information is for educational purposes and should not replace professional medical advice
- **Consult Healthcare Providers**: Always consult with healthcare professionals before starting or stopping medications
- **Data Accuracy**: Information is sourced from OpenFDA but may not be complete or current
- **No Medical Diagnosis**: This tool does not provide medical diagnosis or treatment recommendations


## 🙏 Acknowledgments

- **OpenFDA Team** - For providing the comprehensive drug database API
- **React Community** - For the excellent documentation and ecosystem

---

**Made with ❤️ for better medication safety and awareness**
