# React Native Todo App

This is a simple todo app built using React Native. It allows users to create, update, and delete tasks in a list. This README file will guide you through setting up the project, running it on your local machine, and making any necessary customizations.

## Getting Started

Follow these instructions to get the app up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sayali-redasani/todo-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-native-todo-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

Now that you have the project set up, you can run the app in your development environment.

1. Start the development server:

   ```bash
   npm start
   ```

   This will start the Expo development server and display a QR code in your terminal.

2. Use the Expo Go app on your iOS or Android device to scan the QR code and open the app on your device. Alternatively, you can run the app in an Android or iOS emulator.

### Usage

Once the app is running, you can use it to manage your tasks:

- **Add a Task**: Press the "+" button to add a new task. Enter the task details and press "Add Task."

- **Update a Task**: Tap on an existing task to edit its details. Make your changes and press "Save."

- **Delete a Task**: Swipe left on a task to reveal the delete button and press it to delete the task.

## Customization

You can customize this app to fit your needs. Here are a few ideas:

- Change the app's color scheme and styling in the `styles.js` file.
- Add due dates to tasks and implement reminders.
- Implement user authentication to allow multiple users to manage their own tasks.
- Add categories or labels for tasks.
- Store tasks in a remote database (e.g., Firebase) for data persistence.

## Acknowledgments

- This app was built using React Native and Expo.
- Special thanks to the React Native and Expo communities for their documentation and support.
