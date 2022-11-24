//Nate Coolidge - 100749708


(function(){
    function Start()
    {
        console.log("App Started");
        let deleteButton = document.querySelectorAll('.deleteConfirm'); //look for button with retireConfirm class (retire button)
        for(button of retireButton)
        {
            button.addEventListener('click',(event)=>{ //Listen for the user to click this button
                if(!confirm("Delete this post?")) //Prompt the user to confirm they want to delete a post
                {
                    event.preventDefault(); //Wait for the user to handle the action
                    window.location.assign('/blog-posts');
                }
            });
        }
    }
    window.addEventListener("load", Start); //Start the event listener


})();