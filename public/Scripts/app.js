/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */

(function(){
    function Start()
    {
        console.log("App Started");
        let deleteButton = document.querySelectorAll('.deleteConfirm'); //look for button with deleteConfirm class (retire button)
        for(button of deleteButton)
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