### Frontend Components

#### **src > feedback > feedback.jsx**
- **Contains:**  component named `FeedbackEntries`.
- **Requests Made:** Fetches customer feedback data from a specified endpoint using `fetch`.

---

#### **src > fileUpload > fileinput.jsx**
- **Contains:**  component named `FileInput`.
- **Requests Made:** Uploads files to a specified URL (`/file-upload-batch/2`) using the jQuery fileinput plugin.

---

#### **src > fileUpload > fileUpload.jsx**
- **Contains:** A component named `App` that wraps the `FileInput` component.
- **Requests Made:** None directly; it includes the `FileInput` component, which handles file uploads.

---

#### **src > Main > mainCards.jsx**
- **Contains:** A component named `CardSelector`.
- **Requests Made:** None.

---

#### **src > main > Main.jsx**
- **Contains:** A component named `Main`.
- **Requests Made:** Sends user queries to the server (`/chat_llm`) to get responses using `fetch`.

---

#### **src > main > mainModal.jsx**
- **Contains:** A component named `UserModal`.
- **Requests Made:** None.


### Summary of Frontend Components

#### **Sidebar.jsx**
- **Contains:** A component named `Sidebar`.
- **Requests Made:** None.
- **Purpose:** 
  - Provides navigation links to different sections of the app (e.g., File Upload, DataMasking Assist).
  - Uses  Router's `NavLink` for navigation.
  - Toggles extended view on button click.

---

#### **Summary.jsx**
- **Contains:** A component named `CustomerSummaries`.
- **Requests Made:** Fetches customer summaries from a specified endpoint using `fetch`.
- **Purpose:** 
  - Displays a list of customer summaries in card format.
  - Each card shows customer name, company, timestamp, and a markdown-formatted summary.

---

#### **ContextProvider.jsx**
- **Contains:** A context provider component named `ContextProvider`.
- **Requests Made:** Sends queries to the server at `http://127.0.0.1:5000/agent` using `fetch`.
- **Purpose:** 
  - Provides global state and functions to manage input, prompts, loading state, and results.
  - Defines the `sendQueryToServer` function to handle server requests.
  - Defines the `onSent` function to manage sending chat prompts and updating the UI based on server responses.