$(document).ready(function () {
    $("#form").hide();
    $("#result").hide();
    $('#restart').hide();
    $('#final-result').hide();
    $("#time").hide();

    var trivia = {

        second: 11,
        intervalId: null,
        answer: ["1", "0", "0", "0", "1", "1", "1", "0", "0", "0"],
        questions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        inCorrectAnswer: 0,
        correctAnswer: 0,
        notAnswered: 0,
        submit: true,
        value: 0,
        index: 0,
        startTimerId: 0,
        isRadioSelect: false,
        computerAnswer:null,

        //hide all qustions at the beginning
        hideQustion: function () {
            for (var i = 0; i < this.questions.length; i++) {
                $("#" + this.questions[i]).hide();
            }
        },
        //If radio button select ,compare selected radio value and answer array value 
        //  ,increment index by one  ,and run startTimeOut function 
        //If not,increment index by one and run startTimeOut function  
        //count and display correctAnswer,inCorrectAnswer,notAnswered
        getResult: function () {

            if (this.isRadioSelect) {
                if (this.value === this.answer[this.index]) {

                    $("#" + this.questions[this.index]).hide();
                    $("#result-text").html('well done!!!');
                    $('#correct-answer').html("Your answer is correct");
                    $("#image").html("<img src='assets/images/bravo1.png' alt='Smiley face'  >");

                    $("#result").show();
                    this.correctAnswer++;
                    this.index++;
                    startTimeOut();
                    this.isRadioSelect = false;
                }
                else {
                    
                    if (this.answer[this.index] === "0") {
                       
                        this.computerAnswer = false;
                    }
                    else {
                     
                        this.computerAnswer = true;
                    }
                    $("#" + this.questions[this.index]).hide();
                    $("#result-text").html('Ooops!!!');
                    $('#correct-answer').html("Your are not correct the answer is ." + this.computerAnswer);
                    $("#image").html("<img src='assets/images/ohhno1.png' alt='Smiley face'  >");

                    $("#result").show();
                       this.inCorrectAnswer++;
                    this.index++;
                    startTimeOut();
                    this.isRadioSelect = false;
                }
            }
            else {
                $("#" + this.questions[this.index]).hide();
                $("#result-text").html('Times out!!!');
                $('#correct-answer').html("You didn't select the answer.");
                $("#image").html("<img src='assets/images/ohhno2.png' alt='Smiley face'  >");

                $("#result").show();
                this.notAnswered++;
                this.index++;
                startTimeOut();

            }
            if(this.index===this.questions.length){
             
                $("#corrects-answer").html('Correct Answer : '+this.correctAnswer);   
                $("#incorrect-answer").html('Incorrect Answer : '+this.inCorrectAnswer); 
                $("#not-answerd").html('Unanswered: '+this.notAnswered); 
                $('#result').hide();
                 $('#final-result').show(); 
                 this.index++;
                 startTimeOut();
            }
            

        },

    }
    //clear timeout and while the index is less than length of the qustion  display a qustion ,
    //and  run startInterval function.
    //other wise display restart button.
    function displayQustion() {

        $("#result").hide();
        $("#restart").hide();
        clearTimeout(trivia.startTimerId)
        if (trivia.index < trivia.questions.length) {
            $("#" + trivia.questions[trivia.index]).show();
            trivia.second = 10;
            startInterval();
        }
        else {
            $('#final-result').hide();
            $("#time").hide();
            $('#restart').show();
        }
    }

    //set interaval ,hide start button and run displaySecond function  .
    function startInterval() {
        $('#start').hide();
        clearInterval(trivia.intervalId);
        trivia.intervalId = setInterval(displaySecond, 1000);
    }
    //run the displayQustion function after 2 second
    function startTimeOut() {

        trivia.startTimerId = setTimeout(displayQustion, 3000);
    }

    //decrement and display the second in each second ,and run getResult method on 0 second , 
    function displaySecond() {

        trivia.second--;

        $("#time").text("0:" + trivia.second);

        if (trivia.second === 0) {
            clearInterval(trivia.intervalId);
            trivia.getResult();

        }

    }
    trivia.hideQustion();
    //get the value of the selected radio button ,clear the time interval,and run getResult method.
    $('input[type=radio]').change(function () {

        trivia.isRadioSelect = true;
        clearInterval(trivia.intervalId);
        trivia.value = $(this).attr('value');
        trivia.getResult();
    })
    //on button click run displayQustion method
    $('#start').on('click', function () {
        displayQustion();
        $("#time").show();
    })
    //clear time interval,initialize index , second  ande others property value ,
    //uncecked all radio button and run display function
    $('#restart').on('click', function () {
        clearInterval(trivia.intervalId);
        trivia.index = 0;
        trivia.second = 11;
        trivia.correctAnswer=0;
        trivia.inCorrectAnswer=0;
        trivia.notAnswered=0;
        $('input[type=radio]').each(function () {
            this.checked = false;
        })
        displayQustion();
        $("#time").show();
        $('#final-result').hide();
    })
})






