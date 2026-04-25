# Email Duplicate Detector

A modern, efficient web application designed to clean email datasets by identifying duplicates and invalid formats. This project was developed as part of the **Discrete Structures** course to demonstrate the practical application of Set Theory and algorithmic optimization.

## 👥 Group Members
*   **Hussain Ali** (Roll No: 033)
*   **Eman Tufail** (Roll No: 016)
*   **Maryam** (Roll No: 038)

## 🚀 Features
*   **Drag & Drop Interface:** Modern and intuitive file upload system.
*   **Multi-Format Support:** Processes both `.json` and `.txt` files.
*   **Efficient Processing:** Uses JavaScript `Sets` for $O(N)$ time complexity, making it capable of handling large datasets instantly.
*   **Advanced Validation:** Uses Regular Expressions (Regex) to detect invalid email formats.
*   **Actionable Results:** 
    *   Download cleaned "Unique" lists as JSON.
    *   One-click "Copy to Clipboard" for unique, duplicate, or invalid emails.
*   **Responsive Design:** Fully optimized for desktop and mobile viewing.

## 🧠 Discrete Structures Application
This project serves as a real-world implementation of key concepts from the Discrete Structures curriculum:
*   **Set Theory:** Utilizing the properties of Sets to ensure all elements in the final list are unique.
*   **Time Complexity:** Improved the algorithm from a naive $O(N^2)$ (nested loops) to an optimized $O(N)$ using hash-based Set lookups.
*   **Formal Logic:** Implementation of Boolean logic and Regex patterns for data verification.

## 🛠️ Technologies Used
*   **HTML5:** Semantic structure and file handling.
*   **CSS3:** Custom styling, animations, and responsive layouts.
*   **JavaScript (ES6+):** 
    *   `FileReader API` for local file parsing.
    *   `Set` and `Blob` APIs for data processing and file generation.

## 📖 How to Use
1.  Open `index.html` in any modern web browser.
2.  Drag and drop your `.json` or `.txt` file into the upload zone (or click to select).
3.  Click the **Detect Emails** button.
4.  Review the statistics and the broken-down lists.
5.  Use the **Copy** buttons or the **Download Clean List** button to export your data.

## 📄 License
This project was created for educational purposes as part of a University Assignment.
