const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

class QuizGame {

    constructor(questions) {
        this.question = document.querySelector('#question');
        this.choices = Array.from(document.querySelectorAll('.choice-text'));
        this.progressText = document.querySelector('#progressText');
        this.scoreText = document.querySelector('.score');
        this.progressBarFull = document.querySelector('#progressBarFull');

        this.currentQuestion = {}
        this.acceptingAnswers = true
        this.score = 0
        this.questionCounter = 0
        this.availableQuestions = []
        this.questions = questions;
        this.addEventListener();
    }

    startGame = () => {
        this.questionCounter = 0;
        this.score = 0;
        this.availableQuestions = [...this.questions];
        this.getNewQuestion();
    }

    getNewQuestion = () => {
        if (this.availableQuestions.length === 0 || this.questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', this.score);
            document.getElementById('menuContainer').style.display = "none";
            document.getElementById('heading').style.display = "none";
            document.getElementById('quizContainer').style.display = "none";
            document.getElementById('end').style.display = "block";

            return window.location.assign('#');
        }


        this.questionCounter++
        this.progressText.innerText = `Question ${this.questionCounter} of ${MAX_QUESTIONS}`;
        this.progressBarFull.style.width = `${(this.questionCounter / MAX_QUESTIONS) * 100}%`

        const questionsIndex = Math.floor(Math.random() * this.availableQuestions.length)
        this.currentQuestion = this.availableQuestions[questionsIndex]
        this.question.innerText = this.currentQuestion.question

        this.choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = this.currentQuestion['choice' + number]
        })

        this.availableQuestions.splice(questionsIndex, 1)

        this.acceptingAnswers = true
    }

    addEventListener() {
        this.choices.forEach(choice => {
            choice.addEventListener('click', e => {
                if (!this.acceptingAnswers) return

                this.acceptingAnswers = false;
                const selectedChoice = e.target;
                const selectedAnswer = selectedChoice.dataset['number'];

                let classToApply = selectedAnswer == this.currentQuestion.answer ? 'correct' : 'incorrect';

                if (classToApply === 'correct') {
                    this.incrementScore(SCORE_POINTS);
                }

                selectedChoice.parentElement.classList.add(classToApply);

                setTimeout(() => {
                    selectedChoice.parentElement.classList.remove(classToApply);
                    this.getNewQuestion();
                }, 1000);
            });
        });
    }

    incrementScore = num => {
        this.score += num;
        this.scoreText.innerText = this.score;

    }

}

let quiz1Questions = [{
        question: 'Which of the following is not applicable to an AC system?',
        choice1: 'It can be transformed.',
        choice2: 'It develops eddy currents',
        choice3: 'It can interfere with communications lines',
        choice4: 'It is suitable for charging batteries.',
        answer: 1,
    },

    {
        question: 'Which component consists of two plates seperated by a dielatetcic that can store a charge, and is used for tuning and filtering circuits?',
        choice1: 'Inductor',
        choice2: 'Transistor',
        choice3: 'Capacitor',
        choice4: 'Relay',
        answer: 3,
    },

    {
        question: 'Which component is a simple wire wound into a helix and develops a magentic field when current passes through it. ',
        choice1: 'Semiconductor',
        choice2: 'Inductor',
        choice3: 'Capacitor',
        choice4: 'Transistor',
        answer: 2,
    },

    {
        question: 'The fourth colour band on a resistor, often gold or silver, indicates the resistors what?',
        choice1: 'Tolerance',
        choice2: 'Capacity ',
        choice3: 'Efficiency ',
        choice4: 'Multiplier',
        answer: 1,
    },

    {
        question: 'In order to calculate watt hours, which of the following formulas must be used?',
        choice1: 'E x I x T²',
        choice2: 'Amps/Volts',
        choice3: 'E x I x T',
        choice4: '24 /(E x I x T )',
        answer: 2,
    },

    {
        question: 'Inductance and capacitance are not considerations in a DC current for which of the following reasons?',
        choice1: 'DC supply has no frequency',
        choice2: 'DC supply carries power equally',
        choice3: 'Both of the above',
        choice4: 'None of the above',
        answer: 2,
    },

    {
        question: 'Two equally valued resistors in series have a total resistance of which of the following?',
        choice1: 'Twice as much as one of the resistors',
        choice2: 'The sum of one',
        choice3: 'The difference between each resistance',
        choice4: 'None of the above',
        answer: 4,
    },
    {
        question: 'The electrical property of conductors that allows them to oppose the free flow of current traveling over them is measured in which of the following?',
        choice1: 'Amperes',
        choice2: 'Ohms',
        choice3: 'Volts',
        choice4: 'Watts',
        answer: 3,
    },

    {
        question: 'In a coil, the higher the level of self-inductance:',
        choice1: 'The lower the level of resistance will be',
        choice2: 'The longer the delay will be in establishing current through it',
        choice3: 'The greater the level of flux produced will be',
        choice4: 'None of the above',
        answer: 2,
    },

    {
        question: 'Two transmission wires create a corona when which of the following exists:',
        choice1: 'The wires have a high potential difference',
        choice2: 'The wires are installed overlapping or too close together',
        choice3: 'The wires are spaced too far apart',
        choice4: 'None of the above',
        answer: 2,
    },

]; //completed

let quiz2Questions = [{
        question: 'What are the 2 terminals of a diode called?',
        choice1: 'Gate and Drain',
        choice2: 'Pentode and Triode',
        choice3: 'Anode and Cathode',
        choice4: 'Drain and Source',
        answer: 3,
    },
    {
        question: 'How many diodes are in a single-phase full wave bridge rectifier?',
        choice1: '2',
        choice2: '4',
        choice3: '3',
        choice4: '8',
        answer: 2,
    },
    {
        question: 'What is a BJT?',
        choice1: 'Bit Junction Transfer',
        choice2: 'Bi-polar Junction Transistor',
        choice3: 'Bell Jar Transformer',
        choice4: 'Back Junction Transformer',
        answer: 2,
    },
    {
        question: 'How many terminals does a BJT have? ',
        choice1: '4',
        choice2: '1',
        choice3: '2',
        choice4: '3',
        answer: 4,
    },
    {
        question: 'What are the terminals of a BJT?',
        choice1: 'Positive, Negative, Neutral',
        choice2: 'Drain, Gate, Source',
        choice3: 'Emitter, Base, Collector',
        choice4: 'Anode, Cathode, Triode',
        answer: 3,
    },
    {
        question: 'What is an FET?',
        choice1: 'Field Effect Transformer',
        choice2: 'Field Effect  Transistor',
        choice3: 'French Energy Transfer',
        choice4: 'Farad Effect Transformer',
        answer: 2,
    },
    {
        question: 'What are the terminals of an FET?',
        choice1: 'Triode, Pentode, Cathode',
        choice2: 'Emitter, Base, Collector',
        choice3: 'Pentode, Anode, Source',
        choice4: 'Drain, Gate, Source',
        answer: 4,
    },
    {
        question: 'In a Digital circuit using an AND gate, what is 1 AND 1?',
        choice1: '1',
        choice2: '2',
        choice3: '0',
        choice4: '4',
        answer: 1,
    },
    {
        question: 'Which device can be used to store charge?',
        choice1: 'Transistor',
        choice2: 'Diode',
        choice3: 'Capacitor',
        choice4: 'Resistor',
        answer: 3,
    },
    {
        question: 'What number does a blue band represent in the resistor colour code?',
        choice1: '4',
        choice2: '1',
        choice3: '2',
        choice4: '6',
        answer: 4,
    },

]; //completed

let quiz3Questions = [{
        question: 'Calculate the current in a circuit when the voltage of the circuit is 5 V and the circuit has a total resistance of 5 Ω?',
        choice1: '1 A',
        choice2: '2 A',
        choice3: '10 A',
        choice4: '25 A',
        answer: 1,
    },
    {
        question: 'Two circuits are set up and both circuits contain two bulbs. One circuit is set up so that the bulbs are connected in series, whilst the other is set up so that the bulbs are connected in parallel. In which circuit will the bulbs be brightest if both circuits have the same resistance and the same voltage applied?',
        choice1: 'Circuit in parallel',
        choice2: 'Circuit in series',
        choice3: 'They will both have the same brightness',
        choice4: 'It is impossible to tell',
        answer: 1,
    },
    {
        question: 'What is the total resistance in a circuit if the potential difference is 12 V and the current flowing through the circuit is 3 A?',
        choice1: '2 Ω',
        choice2: '3 Ω',
        choice3: '4 Ω',
        choice4: '5 Ω',
        answer: 3,
    },
    {
        question: 'If two components are connected in series, how is the potential difference across each split?',
        choice1: 'It is dependent on which components are used',
        choice2: 'It is dependent on the resistance of the components used',
        choice3: 'One component gets twice as much voltage as the other',
        choice4: 'They are the same',
        answer: 1,
    },
    {
        question: 'If the voltage in a circuit is increased whilst the resistance stays constant, what will happen to the current in the circuit??',
        choice1: 'Current decreases',
        choice2: 'Current increases',
        choice3: 'Current stays the same',
        choice4: 'Values for the voltage and resistance are required to answer this',
        answer: 1,
    },
    {
        question: 'What is the current through a circuit which contains three resistors of size 3 Ω, 5 Ω and 7 Ω respectively which are placed in series when a potential difference of 12 V is applied?',
        choice1: '0.8 A',
        choice2: '1 A',
        choice3: '2 A',
        choice4: '10 A',
        answer: 1,
    },
    {
        question: 'Why does a 60 W equivalent fluorescent bulb use less energy than a 60 W filament bulb?',
        choice1: 'The electrons flow through the fluorescent bulb at a smaller voltage which reduces the energy used',
        choice2: 'The electrons flow through the fluorescent bulb with a smaller current, thus reducing the energy used',
        choice3: 'The fluorescent bulb has a smaller resistance than the filament bulb',
        choice4: 'They use the same amount of energy',
        answer: 2,
    },
    {
        question: 'Two 2 Ω resistors are placed in parallel in a circuit. If the potential difference supplied to the circuit is 10 V, what size is the current which passes through each resistor?',
        choice1: '5 A',
        choice2: '10 A',
        choice3: '20 A',
        choice4: '40 A',
        answer: 1,
    },
    {
        question: 'What is the definition of current?',
        choice1: 'Flow of atoms through a circuit',
        choice2: 'Flow of electrons through a circuit',
        choice3: 'The amount of resistance an electron experiences when travelling through a circuit',
        choice4: 'The energy which each electron has when flowing through a circuit',
        answer: 2,
    },
    {
        question: 'If the voltage in a circuit stays constant but the resistance is increased, what will happen to the current?',
        choice1: 'Current decreases',
        choice2: 'Current increases',
        choice3: 'Current stays the same',
        choice4: 'Values for the voltage and resistance are required to answer this',
        answer: 2,
    },

]; //completed

let quiz4Questions = [{
        question: 'Choose the Passive Component',
        choice1: 'Transistor',
        choice2: 'Resistor',
        choice3: 'Diode',
        choice4: 'Integrated Circuit (IC)',
        answer: 2,
    },
    {
        question: 'What are the units of capacitor?',
        choice1: 'Farad',
        choice2: 'Ohms',
        choice3: 'Kilo',
        choice4: 'Henry',
        answer: 1,
    },
    {
        question: 'What is the Zener diode used for?',
        choice1: 'Filter Circuit',
        choice2: 'Rectifier Circuit',
        choice3: 'Regulator Circuit',
        choice4: 'Impedance Ciruit',
        answer: 3,
    },
    {
        question: 'What varies the resistance of an LDR?',
        choice1: 'Light',
        choice2: 'Magnet Flux',
        choice3: 'Heat',
        choice4: 'Tilt',
        answer: 1,
    },
    {
        question: 'When two batteries (1.5V) connected in series, What we will get?',
        choice1: '0.5 V',
        choice2: '2.5 V',
        choice3: '0 V',
        choice4: '3 V',
        answer: 4,
    },
    {
        question: 'Which one is not related to the transistor term?',
        choice1: 'NPN',
        choice2: 'PNP',
        choice3: 'GDS',
        choice4: 'CBE',
        answer: 3,
    },
    {
        question: 'What are the terminals of the Zener diode?',
        choice1: 'Anode, Cathode',
        choice2: 'Input, Output',
        choice3: 'No Polarities',
        choice4: 'Unregulated i/p, Regulated o/p',
        answer: 1,
    },
    {
        question: 'What are the two terminals of a normal battery?',
        choice1: '0, +Ve',
        choice2: '-Ve, +Ve',
        choice3: '-Ve, 0',
        choice4: 'GND, -Ve',
        answer: 2,
    },
    {
        question: 'If you make a voltage divider circuit with R1 = 10K and R2 = 10K, and your Vin is 12V, what will be your Vout?',
        choice1: '12 V',
        choice2: '10 V',
        choice3: '6 V',
        choice4: '5 V',
        answer: 3,
    },
    {
        question: 'A simple series circuit consists of one 1.5V battery, wires and one bulb. When the 1.5V battery is replaced with a 3V battery:',
        choice1: 'The bulb flows with the same level of brightness',
        choice2: 'The bulb "blows" and the circuit will no longer work',
        choice3: 'The bulb glows brighter',
        choice4: 'The bulb glows dimmer',
        answer: 3,
    },

]; //completed

let quiz5Questions = [{
        question: 'What characteristics would characterize an ideal operational amplifier?',
        choice1: 'An infinite voltage gain, an infinite input resistance and zero output resistance',
        choice2: 'An infinite voltage gain, zero input resistance and an infinite output resistance',
        choice3: 'An infinite voltage gain, zero input resistance and zero output resistance',
        choice4: 'An infinite voltage gain, an infinite input resistance and an infinite output resistance',
        answer: 1,
    },
    {
        question: 'An amplifier is constructed using a 741 op-amp. What is the maximum gain that can be achieved if the arrangement must have a bandwidth of 10 kHz?',
        choice1: '10',
        choice2: '100',
        choice3: '1,000',
        choice4: '10,000',
        answer: 2,
    },
    {
        question: 'What form of circuitry would typically be used to form the input stage of a bipolar operational amplifier?',
        choice1: 'A push-pull amplifier',
        choice2: 'A long-tailed pair amplifier',
        choice3: 'An emitter follower amplifier',
        choice4: 'A common-emitter amplifier',
        answer: 2,
    },
    {
        question: 'What form of circuitry would typically be used to form the output stage of a bipolar operational amplifier?',
        choice1: 'A long-tailed pair amplifier',
        choice2: 'A push-pull amplifier',
        choice3: 'A common-emitter amplifier',
        choice4: 'An emitter follower amplifier',
        answer: 2,
    },
    {
        question: 'What form of circuitry would typically be used to form the input stage of a CMOS operational amplifier?',
        choice1: 'A source follower amplifier',
        choice2: 'A push-pull amplifier',
        choice3: 'A long-tailed pair amplifier',
        choice4: 'A common-source amplifier',
        answer: 3,
    },
    {
        question: 'An amplifier has an input resistance of 1 kilohms and an output resistance of 25 ohms. The amplifier is connected to a load resistance of 100 ohms. What is the power gain of the amplifier if the input voltage is 3 V and the output voltage is 30 V?',
        choice1: '400',
        choice2: '4000',
        choice3: '1000',
        choice4: '100',
        answer: 3,
    },
    {
        question: 'What is the gain in dB corresponding to a power gain ratio of 300?',
        choice1: '49.5 dB',
        choice2: '-24.8 dB',
        choice3: '14.8 dB',
        choice4: '24.8 dB',
        answer: 4,
    },
    {
        question: 'What is normally used to convert the alternating voltage produced by rotating a coil in a magnetic field, into a direct voltage?',
        choice1: 'A commutator',
        choice2: 'A regulator',
        choice3: 'A transformer',
        choice4: 'A semiconductor rectifier',
        answer: 1,
    },
    {
        question: 'A six-pole alternator is required to operate at 50 Hz. What is the required rotation speed?',
        choice1: '17 rpm',
        choice2: '50 rpm',
        choice3: '1000 rpm',
        choice4: '3000 rpm',
        answer: 3,
    },
    {
        question: 'What is the rotation speed of a six-pole synchronous motor when used with a single-phase 60 Hz supply?',
        choice1: '60 rpm',
        choice2: '180 rpm',
        choice3: '3,600 rpm',
        choice4: '10,800 rpm',
        answer: 4,
    },

]; //completed

let quiz6Questions = [{
        question: "What describes the relationship between the output voltage waveform of a common-emitter amplifer and it's input voltage waveform?",
        choice1: 'Out of phase by 180 degrees',
        choice2: 'lagging by 90 degrees',
        choice3: 'Leading by 90 degrees',
        choice4: 'In Phase',
        answer: 1,
    },
    {
        question: 'What should the input impedance be compared to the resistane of the source to achieve a good voltage amplifier?',
        choice1: 'High',
        choice2: 'Low',
        choice3: 'Capacitive',
        choice4: 'Inductive ',
        answer: 1,
    },
    {
        question: 'For generating a 1KHz note, which one oscillator is most suitable?',
        choice1: 'Hartley',
        choice2: 'Colpitts',
        choice3: 'Radio Frequency (RF)',
        choice4: 'Wien Bridge',
        answer: 4,
    },
    {
        question: "What describes the relationship between the output current waveform of a common-emitter amplifer and it's input current waveform?",
        choice1: 'Out of Phase by 90 Degrees',
        choice2: 'Out of Phase by 180 degrees',
        choice3: 'In Phase',
        choice4: 'None of the Above',
        answer: 3,
    },
    {
        question: 'The output of an astable multivibrator is always a symmetrical square wave. Verify this statement',
        choice1: 'True',
        choice2: 'Always Sinewave',
        choice3: 'Always Sawtooth',
        choice4: 'False',
        answer: 4,
    },
    {
        question: "What voltage does the emitter resistor keep the emitter at compared to it's ground potewntial?",
        choice1: 'Positive',
        choice2: 'Negative',
        choice3: 'Zero',
        choice4: 'None of the Above',
        answer: 2,
    },
    {
        question: 'Which cut-off frequency of an amplifier is mostly affected by a coupling capacitor?',
        choice1: 'Higher',
        choice2: 'Single',
        choice3: 'Lower',
        choice4: 'Double',
        answer: 3,
    },
    {
        question: 'In principle, what one circuit is an oscillator?',
        choice1: 'AC to DC Converter',
        choice2: 'Input Voltage Doubler',
        choice3: 'DC to AC Converter',
        choice4: 'None of the Above',
        answer: 3,
    },
    {
        question: 'An amplifier circuit with a voltage gain of 100, gives 2 Volt output. What is the value of the input voltage?',
        choice1: '20 mV',
        choice2: '2 mV',
        choice3: '200 V',
        choice4: '2 V',
        answer: 1,
    },
    {
        question: 'What is the maximum efficiency of a class C amplifier?',
        choice1: '100%',
        choice2: '25%',
        choice3: '50%',
        choice4: '78.5%',
        answer: 1,
    },

]; //completed

const quizList = [{
        title: "Start Quiz",
        quiz: quiz1Questions
    },
    {
        title: "Start Quiz",
        quiz: quiz2Questions
    },
    {
        title: "Start Quiz",
        quiz: quiz3Questions
    },
    {
        title: "Start Quiz",
        quiz: quiz4Questions
    },
    {
        title: "Start Quiz",
        quiz: quiz5Questions
    },
    {
        title: "Start Quiz",
        quiz: quiz6Questions
    }
];

const menuOptions = [{
        'difficulty': 'beginner',
        'quizTitle': '1',
        'image': 'capacitor.jpeg',
        'imageTitle': 'capacitor component diagram decription',
        'level': 'green',
        'levelTitle': 'Beginner Level',
    },
    {
        'difficulty': 'beginner',
        'quizTitle': '2',
        'image': 'inductor.jpeg',
        'imageTitle': 'inductor component diagram description',
        'level': 'green',
        'levelTitle': 'Beginner Level',
    },
    {
        'difficulty': 'intermediate',
        'quizTitle': '3',
        'image': 'transistors.jpeg',
        'imageTitle': 'circuit symbol of two types of transistors',
        'level': 'yellow',
        'levelTitle': 'Intermediate Level',
    },
    {
        'difficulty': 'intermediate',
        'quizTitle': '4',
        'image': 'amplifier.jpeg',
        'imageTitle': 'circuit schematic of an operational amplifier',
        'level': 'yellow',
        'levelTitle': 'Intermediate Level',
    },
    {
        'difficulty': 'advanced',
        'quizTitle': '5',
        'image': 'diode.jpeg',
        'imageTitle': 'diode circuit symbol and diagram description',
        'level': 'red',
        'levelTitle': 'Advanced Level',
    },
    {
        'difficulty': 'advanced',
        'quizTitle': '6',
        'image': 'oscillator.jpeg',
        'imageTitle': 'circuit shcematic of a hartley oscillator',
        'level': 'red',
        'levelTitle': 'Advanced Level',
    }
];

class MainPage {

    const

        constructor(quizList) {
            // this.quizListContainer = document.getElementById('quizListContainer');
            // quizList.forEach((quiz, index) => {
            //     let btn = document.createElement("button");
            //     btn.innerHTML = quiz.title;
            //     btn.onclick = this.runQuiz;
            //     btn.dataset.index = index;
            //     this.quizListContainer.appendChild(btn);
            // });

            /* document.getElementById("quizListContainer").onclick = function () {
                 location.href = "game.html";
             }*/

            this.renderOptions();
        }

    renderOptions() {
        let output = '';
        menuOptions.forEach((item, index) => {
            output += `<li class="item-a">
                        <!-------- SLIDER BOX ----------->
                        <div class="box ${item.difficulty}">
                            <!------ QUIZ TITLE -------->
                            <p class="marvel">Quiz ${item.quizTitle}</p>
                            <!-------- QUIZ COVER PHOTO ------------->
                            <img src="assets/images/${item.image}" alt="${item.imageTitle}" class="model">
                            <!----------- QUIZ RATING --------------->
                            <div class="details">
                                <p><i class="fas fa-signal ${item.level}"></i> ${item.levelTitle}</p>
                                <!-------- QUIZ START BUTTON -------->
                                <div class="start_btn">
                                    <button class="start-button" data-index="${index}">START</button>
                                </div>
                            </div>
                        </div>
                    </li>`;
        });




        const container = document.getElementById('menuOptions');
        container.innerHTML = output;

        let buttons = Array.from(document.getElementsByClassName('start-button'));
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                /* document.getElementById('menuContainer').classList.toggle('cs-hidden', true);
                 document.getElementById('quizContainer').classList.toggle('cs-hidden', false);*/
                document.getElementById('menuContainer').style.display = "none";
                document.getElementById('heading').style.display = "none";
                document.getElementById('quizContainer').style.display = "block";
                this.runQuiz(parseInt(button.dataset.index, 10));
            });
        });
    }

    runQuiz(index) {
        let quizGame = new QuizGame(quizList[index].quiz);
        quizGame.startGame();
    }
}

$(document).ready(function () {

    const mainPage = new MainPage(quizList);

    $('#menuOptions').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function () {
            $('#menuOptions').removeClass('cS-hidden');
        }
    });

});

