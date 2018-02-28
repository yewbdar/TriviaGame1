$(document).ready(function () {
    $("#form").hide();
    $("#result").hide();
    $('#restart').hide();
    $("#time").hide();

    var trivia = {

        second: 10,
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

        //hide all qustions at the beginning
        hideQustion: function () {
            for (var i = 0; i < this.questions.length; i++) {
                $("#" + this.questions[i]).hide();
            }
        },
        //If radio button select ,compare selected radio value and answer array value 
        //  ,increment index by one  ,and run startTimeOut function 
        //If not,increment index by one and run startTimeOut function  
        getResult: function () {
            debugger;
            if (this.isRadioSelect) {
                if (this.value === this.answer[this.index]) {
                    debugger;
                    $("#" + this.questions[this.index]).hide();
                    $("#result").html('well done!!!');
                    $('#correct-answer').html("Your answer is correct");
                    $("#image").html("<img src='./images/bravo3.gif'");
                    $("#result").show();
                    this.index++;
                    startTimeOut();
                    this.isRadioSelect=false;
                }
                else {
                    if(this.answer[this.index]===0){
                        var ansr=false;
                    }
                    else{
                        var ansr=true;
                    }
                    $("#" + this.questions[this.index]).hide();
                    $("#result").html('ooops!!!');
                    $('#correct-answer').html("Your are not correct the answer is "+ ansr);
                    $("#image").html("<img src='../assets/images/bravo2.jpeg'");
                    $("#result").show();
                    
                    this.index++;
                    startTimeOut();
                    this.isRadioSelect=false;
                }
            }
            else {
                $("#" + this.questions[this.index]).hide();
                $("#result").html('Time out!!!');
                $('#correct-answer').html("you didn't select the answer");
                $("#image").html("<img src='../assets/images/bravo2.jpeg'");
                $("#result").show();
                this.index++;
                startTimeOut();

            }
        },

    }
    //clear timeout and while the index is less than length of the qustion  display a qustion ,
    //and  run startInterval function.
    //other wise display restart button.
    function displayQustion() {
        debugger;
        $("#result").hide();
        $("#restart").hide();
        clearTimeout(trivia.startTimerId)
        if (trivia.index < trivia.questions.length) {
            $("#" + trivia.questions[trivia.index]).show();
            trivia.second = 10;
            startInterval();
        }
        else {
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

        trivia.startTimerId = setTimeout(displayQustion, 2000);
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
        debugger
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
    //clear time interval,initialize index  and second value ,uncecked all radio button and run display function
    $('#restart').on('click', function () {
        clearInterval(trivia.intervalId);
        trivia.index = 0;
        trivia.second = 10;
        $('input[type=radio]').each(function () {
            this.checked = false;
        })
        displayQustion();
        $("#time").show();
    })
})






