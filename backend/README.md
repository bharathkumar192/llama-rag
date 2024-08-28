### Summary of Endpoints in `App.py`


1. **User Information** ``` + Done```
   - **Endpoint:** `/userinfo`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "user": "User Name",
       "orgInfo": "Organization",
       "email": "user@example.com"
     }
     ```
   - **Description:** 
     - Stores user information such as name, organization, and email in a global dictionary `chatUser`.
     - Logs the user info.
     - **Response:** Returns a message indicating that user info has been saved.

2. **Ingest New Documents** ``` + Done```
   - **Endpoint:** `/ingest_new`
   - **Method:** `POST`
   - **Body:**
     - Multipart form data with files to be ingested.
   - **Description:** 
     - Ingests new documents provided in the form-data.
     - Saves supported files to `NEW_INGEST_FOLDER`.
     - Calls the `ingest` function to update the knowledge base.
     - Merges the ingested files into the source directory.
     - **Response:** Returns a message indicating the ingestion status and lists unsupported files.



3. **Re-ingest All Documents** ``` + Done```
   - **Endpoint:** `/re_ingest_all`
   - **Method:** `GET`
   - **Body:** None
   - **Description:** 
     - Deletes existing knowledge base and log file.
     - Re-ingests all documents from the source directory.
     - **Response:** Returns a message indicating the re-ingestion status.

4. **Chat with LLM** ``` + Done```
   - **Endpoint:** `/chat_llm`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "prompt": "Your question here",
       "history": [
         {"type": "user_prompt", "message": "Previous question"},
         {"type": "ai_response", "message": "Previous answer"}
       ]
     }
     ```
   - **Description:** 
     - Uses the `retrieval_qa_pipline` function to get a response from the LLM based on the current question and history.
     - **Response:** Returns the answer and source documents.

5. **Chat Streaming**  ``` - WIP```
   - **Endpoint:** `/chat_stream`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "prompt": "Your question here",
       "history": []
     }
     ```
   - **Description:** 
     - Streams the chat response as it's being generated.
     - **Response:** Streams data back to the client.

6. **Chat Summary** ``` - WIP```
   - **Endpoint:** `/chat_summary`
   - **Method:** `POST`
   - **Body:** None
   - **Description:** 
     - Placeholder endpoint for chat summary.
     - **Response:** Returns a message indicating that chat summary was received.

7. **Chat Feedback** ``` - WIP```
   - **Endpoint:** `/chat_feedback`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "user": "User question",
       "agent": "Agent response",
       "likeStatus": true,
       "feedback": "Additional feedback"
     }
     ```
   - **Description:** 
     - Stores feedback for the chat interaction in the feedback database.
     - **Response:** Returns a message indicating feedback was received.

8. **Clear Chat History** ``` - WIP```
   - **Endpoint:** `/chat_clear`
   - **Method:** `GET`
   - **Body:** None
   - **Description:** 
     - Clears the chat history.
     - **Response:** Returns a message indicating the conversation history was cleared.







### Summary of Utility Functions in `utils.py`

Here are the main utility functions from `utils.py` and their descriptions:

1. **get_embeddings**
   - Loads embeddings for text processing using the specified model and device type.

2. **file_log**
   - Logs messages to the `file_ingest.log` file.

3. **load_single_document**
   - Loads a single document from a specified file path.

4. **load_document_batch**
   - Loads a batch of documents concurrently using a thread pool.

5. **load_documents**
   - Loads all documents from a specified source directory.

6. **split_documents**
   - Splits documents based on their file type for appropriate processing.

7. **log_to_csv**
   - Logs chat questions and answers to a CSV file.

8. **allowed_file**
   - Checks if a file type is supported based on its extension.

9. **ingest**
   - Loads, splits, and embeds documents into a Chroma vector store for retrieval.

10. **merge_source_docs**
    - Merges new documents into the source directory and removes the source directory after merging.

11. **store_feedback**
    - Stores user feedback in an SQLite database.

12. **store_chat_summary**
    - Stores chat summaries in an SQLite database.

13. **form_history_obj**
    - Formats chat history into a structured object for processing.

14. **load_model**
    - Loads the LLM model for text generation.

15. **retrieval_qa_pipline**
    - Sets up a QA pipeline with a retriever and an LLM for question answering.

16. **convert_to_url**
    - Converts a file path to a URL.

17. **generate_model_prompt**
    - Generates a prompt for the LLM based on chat history and the current question.

18. **convert_history_format**
    - Converts the history format for the model.





### Summary of `Constants.py`


1. **Paths and Directories**
   - **Root Directory:** The main folder of the project.
   - **Source Documents:** Where source files are stored.
   - **Database Folder:** Where the database is kept.
   - **New Ingest Folder:** Where new files to be processed are stored.
   - **Models Path:** Where models are stored.
   - **Feedback Database Path:** Where feedback data is saved.

2. **General Settings**
   - **Prompt for Reformatting Questions:** Helps to rephrase questions based on chat history.
   - **Ingest Threads:** Number of threads for processing files, based on CPU cores (default is 8).
   - **Context Window Size:** Maximum context length for the model (8096 tokens).
   - **Max New Tokens:** Maximum number of tokens to generate, same as context size.
   - **GPU Layers:** Number of GPU layers to use.
   - **Batch Size:** Size of data batches (512).

3. **Chroma Settings**
   - **Chroma Config:** Disables telemetry and enables persistent storage.

4. **Document Loaders**
   - **Document Types:** Maps file types (e.g., HTML, PDF, CSV) to their respective loaders for processing.

5. **Model Configuration**
   - **Embedding Model:** Name of the embedding model ("hkunlp/instructor-large").
   - **Model ID:** ID of the main model ("meta-llama/Meta-Llama-3-8B-Instruct").
   - **Model Basename:** Currently set to `None`.




### check `prompt_template_utils.py` for prompt and input formatting that is best suited for Llama-3.
Source : https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-llama-3/

