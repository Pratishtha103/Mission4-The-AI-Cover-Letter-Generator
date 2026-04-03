async function coverLetter(event){
    event.preventDefault();

    const fullName = document.getElementById('name').value;
    const jobRole = document.getElementById('job-role').value;
    const companyName = document.getElementById('company-name').value;
    const skills = document.getElementById('skills').value;

    const coverLetterText = document.getElementById("cover-letter-text");
    const coverLetter = document.getElementById("cover-letter");

    const generateBtn = document.getElementById("generate-btn");

    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true;
    

    try {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                jobRole,
                companyName,
                skills
            })
        });

        const data = await response.json();
        let result = "";

        if (data.candidates && data.candidates.length > 0) {
            const parts = data.candidates[0]?.content?.parts;

            if (parts && parts.length > 0) {
                result = parts.map(part => part.text || "").join("");
            }
        }

        if (!result) {
            console.log("FULL RESPONSE:", data);
            coverLetter.style.display = 'flex';
            coverLetterText.innerText = "Something went wrong. Check console.";
            return;
        }

        coverLetter.style.display = 'flex';
        coverLetterText.innerText = result;

    } catch (error) {
        console.error("Error:", error);
        coverLetter.style.display = 'flex';
        coverLetterText.innerText = "Error generating cover letter.";
    }
    generateBtn.innerText = "Generate";
    generateBtn.disabled = false;

    event.target.reset();
}

function copyText(button){
    let text = document.getElementById("cover-letter-text").innerText;
    //console.log(text);
    navigator.clipboard.writeText(text);

    
    button.innerHTML = '<img src="tick.png" alt="copied">';

    
    setTimeout(() => {
        button.innerHTML='<img src="copy.png" alt="copy-to-clipboard">';
    }, 2000);
}