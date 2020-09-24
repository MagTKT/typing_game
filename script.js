
        // definie les phrases 
        const array = [ 
            "Tester c'est douter", 
            "Un canard vaut mieux qu'un connard", 
            "Le doctor se trouve dans le tardis", 
            "La vie est difficile mais pas insurmontable", 
            "Je sais plus quoi dire", 
            "La phrase de la fin est infini"
        ]; 

        // defini les elements du html
        const timer_text = document.querySelector(".temps"); 
        const texts = document.querySelector(".demarer"); 
        const area = document.querySelector(".area"); 
        const refresh = document.querySelector(".refresh");
        const score_text = document.querySelector(".scores"); 
        const pseudoInsert = document.querySelector(".pseudo"); 
        let scorefinal = document.querySelector(".scorefinal");
        let temps1 = document.querySelector(".temps1")
        let temps2 = document.querySelector(".temps2")
        let temps3 = document.querySelector(".temps3")

        let tempsimparti = 60; 
        let temps= 0; 
        let space = ""; 
        let num = 0; 
        let timer = null; 
        let score = 0;
        let pseudo = '';
        let final = [];

        temps1.addEventListener("click", (e) => {
            tempsimparti = temps1.value;
            temps.innerHTML = tempsimparti;
            console.log(temps1);
        })
        temps2.addEventListener("click", (e) => {
            tempsimparti = temps2.value;
            temps.innerHTML = 40;
        })
        temps3.addEventListener("click", (e) => {
            tempsimparti = temps3.value;
            temps.innerHTML = 20;
        })
        

        // fonction qui identifie les characteres grace a un span
        function update() { 
            texts.textContent = null; 
            space = array[num]; 

            space.split('').forEach(char => { 
            const charSpan = document.createElement('span') 
            charSpan.innerText = char 
            texts.appendChild(charSpan) 
            }) 

            if (num < array.length - 1) 
                num++; 
            else
                num = 0; 
        } 
        // Fonction qui recupere le texte saisie par le joueur
        function addText() { 

            curr_input = area.value; 
            curr_input_array = curr_input.split(''); 


            score = 0;

            quoteSpanArray = texts.querySelectorAll('span'); 
            quoteSpanArray.forEach((char, index) => { 
            const typedChar = curr_input_array[index] 


                if (typedChar == null) { 
                    char.classList.remove('correct'); 
                    char.classList.remove('incorrect'); 

                    // correct
                    } else if (typedChar === char.innerText) { 
                        char.classList.add('correct'); 
                        char.classList.remove('incorrect'); 

                        //j'incrémente le score à chaque bonne reponse
                        score++; 

                    // incorrect 
                    } else { 
                        char.classList.add('incorrect'); 
                        char.classList.remove('correct'); 
                    
                } 
            });  
            // affiche le nombre de bonne reponse 
            score_text.textContent = total_score + score; 
            

            if (curr_input.length == space.length) { 
                update(); 

                total_score += score; 

                area.value = ""; 
            } 

        } 

        function debutJeux() { 

            reset(); 
            update(); 

            // reinitialise le temps
            clearInterval(timer); 
            timer = setInterval(changeTimer, 1000); 
        } 

        function reset() { 
            tempsimparti = 60;
            temps= 0; 
            score = 0;
            total_score = 0; 
            num = 0; 
            area.disabled = false; 
            

            area.value = ""; 
            texts.textContent = "Tester c'est douter"; 
            timer_text.textContent = tempsimparti + 's'; 
            score_text.textContent = 0; 
            refresh.style.display = "none"; 
        } 

        function changeTimer() { 
            if (tempsimparti > 0) { 
                tempsimparti--; 
                timer_text.textContent = tempsimparti + "s"; 
            } 
            else { 
            // fin du jeu
                finJeux(); 
            } 
        } 
        
        function finJeux() { 
            clearInterval(timer); 
            area.disabled = true; 
            texts.textContent = "Cliquer pour redémarrer le jeu ^^"; 
            refresh.style.display = "block"; 

            pseudo = prompt('veuillez entrez votre pseudo')
            
            final.push({pseudo:pseudo, score :score});
            console.log(final);

            //classe par score décroissant
            final.sort((a, b) => {
                return parseFloat(b.score) - parseFloat(a.score);
            });

            localStorage.setItem('final' , JSON.stringify(final));
            finalscore = JSON.parse(localStorage.getItem('final'));
            console.log(finalscore);

            finalscore.forEach(blabla =>{
                test = document.createElement("div");
                test.innerHTML += blabla.score +' - '+ blabla.pseudo;
                scorefinal.appendChild(test);
            });
            
        } 