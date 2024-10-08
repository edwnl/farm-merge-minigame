# Speed Merge Valley

Speed Merge Valley is an engaging puzzle game where players merge farm objects on a grid, aiming to clear the board as quickly as possible. This project demonstrates the use of modern web technologies to create an interactive and visually appealing game.

## Features

- 10x10 grid gameplay with various farm objects
- Drag-and-drop mechanics for moving and merging objects
- Real-time score tracking (time, moves, merges)
- Leaderboard to showcase top players
- Responsive design (desktop only)

## Tech Stack

- **Frontend:**

  - Next.js (React framework)
  - TypeScript
  - Tailwind CSS for styling
  - Ant Design for UI components
  - Framer Motion for animations

- **Backend:**

  - Firebase Firestore for leaderboard data storage

- **State Management:**

  - React Hooks

- **Deployment:**
  - Vercel (for Next.js hosting)

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/speed-merge-valley.git
   cd speed-merge-valley
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Firestore in your project
   - Copy your Firebase configuration
   - Create a `.env.local` file in the root directory and add your Firebase configuration:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
     ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
