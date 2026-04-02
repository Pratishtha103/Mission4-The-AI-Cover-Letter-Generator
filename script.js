function coverLetter(event){
    event.preventDefault();

    const fullName = document.getElementById('name').value;
    const jobRole = document.getElementById('job-role').value;
    const companyName = document.getElementById('company-name').value;
    const skills = document.getElementById('skills').value;
    //console.log(`${fullName}, ${jobRole}, ${companyName}, ${skills}`);

    event.target.reset();
    
}
function copyText(button){
    let text = document.getElementById("cover-letter-text").innerText;
    console.log(text);
    navigator.clipboard.writeText(text);

    // Change button text
    button.innerHTML = '<img src="tick.png" alt="copied">';

    // Revert after 2 seconds
    setTimeout(() => {
        button.innerHTML='<img src="copy.png" alt="copy-to-clipboard">';
    }, 2000);
}