let weightScale = "";
let bmi ="";

//to check repeating same answers in orderreapeating
let repeatCount = 0;
let previousUserInput=null;

// user name status and the name 
let userName = "";
let namestates = false;

//knowledge improvemt 
let userAnswers = {};//Object to store user answers
let awaitingAnswer = false;// unknown question answer status false
let unknownQuestion = "";



 // Fetch advices from text file
 let overweightAd=[];
 fetch('overweightAdvice.txt')
 .then(response => response.text())
 .then(text => {
  overweightAd = text.split('\n').map(ovAd => ovAd.trim());
 })

 let normalWeightAd=[];
 fetch('normalweightAdvice.txt')
 .then(response => response.text())
 .then(text => {
  normalWeightAd = text.split('\n').map(ovAd => ovAd.trim());
 }).catch(error=> console.error('Error fetching courses:', error));

 let underweightAd =[];
 fetch('underweightAdvice.txt')
 .then(response => response.text())
 .then(text => {
  underweightAd = text.split('\n').map(ovAd => ovAd.trim());
 }).catch(error=> console.error('Error fetching courses:', error));


// Define hiInput and corresponding responses from user
const hiInput = ["hi", "hello", "hey", "whatsup", "hii", "hello yum yum", "hi yum yum"];

const naming = ["what is your name", "your name", "whats your name", "what's your name"];
const glad = ["i'm glad to hear that", "i'm happy to hear", "great to hear it"];



//------------------------BOT RANDOM RESPONSES--------------------------------//


// BOT hi responses 
const hiResponses = [
  "Whatsup 😎 <b>{{userName}}</b><br><img src='giphy.gif' alt='' width='120' height='140'>",
  "Hello 😉<b>{{userName}}</b><br><img src='giphy.gif'  alt='' width='120' height='140'>",
  "Hello <b>{{userName}}</b>, Nice to meet you...<br><img src='giphy.gif'  alt='' width='120' height='140'>"
];

//Object to store common questions and their direct responses
const commnQuest={
  "how are you" :"I'm doing good😍",
  "nice to meet you":"I'm Glad to meet you too 😎",
  "good morning":"Good Morning 🌞",
  "good night":"Good Night 🌙",
  "good evening":"Good evening 🌅"
}



//BOT asking weight and height
const weightAndHeight = [
    "To continue this chat or suggest you meals first I need to know your <b>BMI </b>value<br> To calculate the BMI I need your <b>height</b> (in meters) and <b>weight</b> (in kilograms)<br><b> example - my height is x.xx ,weight is x.xx</b> ",
    "To continue this chat or suggest you meals first I need to know your <b>BMI </b>value<br>In order to calculate BMI, I require some data. What's your <b>height</b> (in meters) and <b>weight</b> (in kilograms) ? <br><b> example - my height is x.xx ,weight is xx.xx</b>",
    ];



const responseObj = {
  "default": "I'm sorry, I didn't get that.",
  "greeting": "Hello <b>{{userName}}</b>,I'm <b>Yum Yum 😊</b>. what's your name? ",
};


//-------------Over weight meal set
const Overweight = {
  breakfast: [
    "🥯 Whole grain bagel with 1/2 teaspoon of light cream cheese<br>🍓 Strawberry jam without sugar<br>☕ 1 cup of decaffeinated coffee with 4 ounces of skimmed milk (Approx. 200 cal.)",
    "🍇 1/2 cup of frozen fruits<br>8 ounces of low-fat yogurt (Approx. 170 cal.)",
    "🥛 4 ounces of skimmed milk<br>🥣 1/2 cup of whole wheat cereal<br>🍏 1 medium apple (Approx. 205 cal)",
    "🍲 1/2 cup of cooked oats with 4 ounces of skimmed milk<br>2 low-fat, low-sodium turkey slices (Approx. 205 Cal.)",
    "🥣 1/2 cup of whole wheat cereal with 4 ounces of low-fat yogurt<br>1 cup of blueberries (Approx. 185 Cal.)", 
    "🍞 1 slice of whole wheat bread<br>🧀 1 slice of low-fat, low-sodium cheese<br>☕ 1 cup of decaffeinated coffee with 4 ounces of skimmed milk (Approx. 180 cal.)",
    
  ],
  lunch: [
    "🍞 1 slice of whole wheat bread<br>🥚 2 hard-boiled eggs<br>🍅 1 sliced tomato<br>🥗 2 cups of lettuce with 1 teaspoon low-fat dressing (Approx. 410 cal.)",
    "🦃 3 ounces of low-fat, low-sodium turkey slices<br>🥚 1 teaspoon low-fat mayonnaise<br>🥕 1 cup of raw carrots and celery<br>🥗 1 cup of lettuce<br>🍞 1 slice whole wheat bread (Approx. 270 cal.)",
    "🐟 1 low-sodium can of tuna<br>🫒 1 teaspoon of olive oil and some lemon juice<br>🌶️ 1 cup of sliced red peppers<br>🌿 2 cups of raw spinach<br>🍅 1 teaspoon of low-fat Italian dressing (Approx. 300 cal.)",
    "🍚 1/3 cup of brown rice<br>🍗 3 ounces of boneless grilled chicken breast<br>🥕 1 cup of raw celery<br>🥕 1 cup of raw carrots<br>🥗 2 teaspoons of light ranch dressing (Approx. 320 cal.)",
    "🌮 1/2 cup of black beans<br>🍚 1/2 cup of brown rice<br>🥗 2 cups of lettuce with low-fat ranch dressing<br>🍌 1/2 of a banana (Approx. 310 cal.)",
    "🍝 1/2 cup of whole wheat pasta<br>🫒 1 teaspoon of olive oil<br>🧀 two teaspoons of parmesan cheese<br>🐟 3 oz of grilled salmon<br>🍅 2 cups of lettuce, tomatoes, and onions<br>🥦 1/2 cup of your favorite steamed vegetables<br>🥛 two teaspoons of light sour cream (Approx. 365 cal.)",
    "🥗 1/2 cup of red beans<br>🍝 1/2 cup of whole wheat pasta (macaroni) with salt and pepper<br>🥗 2 cups of lettuce<br>🧀 1 teaspoon of parmesan cheese<br> Serve cold (Approx. 315 cal.)"
  ],
  
  dinner: [
    "🍗 3 ounces of boneless grilled chicken breast<br>🥦 1 cup of steamed broccoli with 1 teaspoon of low-fat dressing<br>🥔 1/2 baked potato with pepper and oregano (Approx. 275 cal.)",
    "🍚 1/2 cup of brown rice<br>🐟 3 ounces of baked salmon<br>🥦 2 cups of steamed broccoli with 2 teaspoons of low-fat cream cheese (Approx. 325 cal.)",
    "🐟 5 ounces of baked tilapia<br>🫒 1 teaspoon of olive oil<br>🌽 1/2 cup of low-sodium corn<br>🥬 2 cups of fresh spinach<br>🍷 2 teaspoons of low-sodium red wine vinaigrette (Approx. 360 cal.)",
    "🦃 6 ounces of low-fat, low-sodium turkey breast<br>🥗 2 cups of lettuce with 2 tablespoons of raisins<br>🍷 2 teaspoons of low-sodium red wine vinaigrette (Approx. 350 cal.)",
    "🥩 2 grilled tofu slices (1 inch) seasoned with a little salt and pepper<br>🍄 1/2 cup of sliced mushrooms<br>🧅 1/2 cup of onions (julienne style)<br>🍅 1 tomato (julienne style), cooked on the grill with 2 teaspoons of olive oil and a dash of black pepper<br>🥔 baked potato (Approx. 345 cal.) ",
    "🍗 3 ounces of boneless grilled chicken breast<br>🥦 2 cups of baked broccoli<br>🥗 2 teaspoons of low-fat, low-sodium dressing<br>🍚 1/2 cup of brown rice (Approx. 325 cal.)",
    "🐟 3 ounces of grilled tuna<br>🥬 2 cups of dark green vegetables<br>🍅 1 sliced tomato<br>🥗 2 teaspoons of low-fat, low-sodium dressing<br>🍚 1/2 cup of brown rice (Approx. 325 cal.)"
  ],
  snack: [
    "🍊 1 medium orange<br>🥧 1/2 small muffin (Approx. 150 cal.)",
    " 🍊 1 medium tangerine<br>🍘 5 unsalted rice crackers<br>🌰 6 almonds (Approx. 175 cal.)",
    " 🍊 1 medium orange<br>🍪 1 granola cookie (70 calories)<br>(Approx. 140 cal.)",
    "🍈 1 cup of melon<br>🧁 1/2 of a whole wheat muffin (Approx. 130 cal.)",
    "🍍 1/2 cup of pineapple<br>🍫 1 low-sodium granola bar (160 calories)<br>(Approx. 220 cal.)",
    "🍓 6 big strawberries<br>🍪 1 granola cookie (70 calories)<br>(Approx. 130 cal.)",
    "🍇 1/2 cup of frozen fruits<br>🥖 2 breadsticks (Approx. 130 cal.)"    
  ]
};

//-------------Underweight meal set
const Underweight = {
  breakfast:[
   
"🌯 2 servings Vegan Freezer Breakfast Burritos<br>🍓 1 cup strawberries (Approx. 500 cal.)",
"🍑 1 serving Raspberry Peach Mango Smoothie Bowl<br>🥚 1 hard-boiled egg (Approx. 500 cal.)",
"🥣 2 servings Maple-Nut Granola<br>🥛 1 cup 2% milk",
"🍑 1 serving Raspberry Peach Mango Smoothie Bowl<br>🥚🥚 2 hard-boiled eggs (Approx. 500 cal.)",
"🍑 1 serving Raspberry Peach Mango Smoothie Bowl<br>🍊 1 medium orange<br>🥚🥚 2 hard-boiled eggs (Approx. 500 cal.)",
"🌯 1 serving Vegan Freezer Burritos<br>🍌 1 medium banana<br>🥜 2 Tbsp. peanut butter (Approx. 500 cal.)"
],
lunch:

[
"🥗 2 servings Vegetable & Tuna Pasta Salad<br>🥭 1 cup mango chunks (Approx. 470 cal.)",
"🍠 1 serving Roasted Butternut Squash & Root Vegetables with Cauliflower Gnocchi<br>🍞 1 slice whole-wheat toast with 1 tsp. unsalted butter (Approx. 470 cal.)",
"🌯 2 servings Creamy Avocado and White Bean Wraps<br>🍓 1 cup strawberries (Approx. 470 cal.)",
"🌯 2 servings Creamy Avocado and White Bean Wraps (Approx. 470 cal.)"
],

dinner:
[
"🍖 1 serving Sheet-Pan Maple-Mustard Pork Chops and Carrots<br>🍚 1 1/2 cups Easy Brown Rice",
"🥪 2 servings Philly Cheese Steak Sloppy Joes<br>🥗 2 cups fresh spinach & 1 cup shredded carrots topped with ½ Tbsp. olive oil & ½ Tbsp. balsamic vinegar (Approx. 485 cal.)",
"🍲 2 servings Creamy Chicken, Brussels Sprouts and Mushroom One-Pot Pasta (Approx. 485 cal.)",
"🍗 1 serving Southern Style Oven-Fried Chicken<br>🥔 1 serving Greek Potato Salad<br>🥦 1 serving Garlicky Green Beans(Approx. 485 cal.)",
"🥗 2 servings Green Goddess Salad with Chicken<br>🍞 1 slice whole-wheat toast with 1 tsp. unsalted butter(Approx. 485 cal.)",
"🐟 2 servings Tortilla Chip Flounder with Black Bean Salad (Approx. 485 cal.)",
"🐟 1 serving Creamed Spinach-Stuffed Salmon<br>🥦 2 servings Garlicky Green Beans<br>🍚 3/4 cup Easy Brown Rice (Approx. 485 cal.)"
],
snack:

[
"🍯 1 serving Almond-Honey Power Ba (Approx. 225 cal.)",
"🍏 1 large apple with 1 Tbsp. natural peanut butter (Approx. 225 cal.)",
"🥕 15 baby carrots with 3 Tbsp. hummus<br>🍊 1 medium orange",
"🍿 1 serving Homemade Microwave Popcorn<br>🍌 1 large banana<br>🌰 8 unsalted almonds (Approx. 225 cal.)",
"🧀 1 slice Swiss cheese<br>🍞 8 whole-wheat crackers (Approx. 225 cal.)",
"🍓 6 oz. 2% plain Greek yogurt with 1 cup strawberries<br>🍯 1 Tbsp. honey (Approx. 225 cal.)",
"🥕 15 carrot sticks with 1/4 cup hummus<br>🍊 1 medium orange (Approx. 225 cal.)"
]
};

//-------------normal weight meal set
const NormalWeight = {
  breakfast: [
    "🍊 One grapefruit<br>🍳 Two poached eggs (or fried in a non-stick pan)<br>🍞 One slice 100% whole wheat toast (Approx. 245 cal.)",
    "🥯 One whole-wheat English muffin with 2 tablespoons peanut butter<br>🍊 One orange (Approx. 245 cal.)",
    "🥣 Overnight Oats (one mashed banana, 2 tablespoons chia seeds, 1/2 cup oats, 1 cup almond milk, 1 teaspoon cinnamon)(Approx. 245 cal.)",
    "🍞 Two slices 100% whole wheat toast with 2 tablespoons peanut butter<br>🍌 One banana (Approx. 245 cal.)",
    "🥯 One whole wheat bagel<br>🧀 3 tablespoons cream cheese (Approx. 245 cal.)",
    "🥣 One (7-ounce) container of 2% Greek yogurt<br>🍌 One banana<br>🥚 One hard-boiled egg (Approx. 245 cal.)",
    "🥣 1 cup cooked oatmeal<br>🫐 1/2 cup blueberries<br>🥛 1/2 cup non-fat milk<br>🥜 2 tablespoons almond butter (Approx. 245 cal.)"
  ],
  lunch: [
    "🍗 6 ounces grilled chicken breast<br>🥗 Large garden salad (3 cups mixed greens with 1 cup cherry tomatoes, 1/4 avocado, topped with 2 tablespoons balsamic vinaigrette) (Approx. 450 cal.)",
    "🥪 Turkey sandwich (6 ounces of turkey breast meat, large tomato slice, green lettuce, 1/4 avocado, and 2 teaspoons honey mustard on two slices of whole wheat bread) (Approx. 450 cal.)",
    "🍳 One fried egg<br>🍞 One slice whole wheat bread<br>🥑 1/2 avocado, mashed<br>🍎 1 medium apple (Approx. 450 cal.)",
    "🌯 Tuna wrap with one wheat flour tortilla, 1/2 can water-packed tuna (drained), 1 tablespoon mayonnaise, lettuce, and sliced tomato<br>🥑 1/2 sliced avocado (Approx. 450 cal.)",
    "🍔 Veggie burger<br>🍞 Whole grain bun<br>🧀 One slice cheddar cheese<br>🍎 One sliced apple",
    "🌯 One whole wheat tortilla<br>🍗 4 ounces turkey<br>🧀 One slice cheddar cheese<br>🥗 1 cup mixed greens<br>🥄 1 tablespoon honey mustard (Approx. 450 cal.)",
    "🍗 6-ounce baked chicken breast<br>🥗 Large garden salad with tomatoes and onions and 2 tablespoons balsamic vinaigrette<br>🍠 One baked sweet potato (Approx. 450 cal.)"
  ],
  dinner: [
    "🥦 1 cup steamed broccoli<br>🍚 1 cup of brown rice<br>🐟 Halibut (4-ounce portion) (Approx. 280 cal.)",
    "🥩 5-ounce sirloin steak<br>🍠 One roasted sweet potato<br>🥬 1 cup cooked spinach (made with 2 teaspoons olive oil)<br>🫘 1 cup green beans (Approx. 280 cal.)",
    "🥯 One whole wheat English muffin<br>🍅 One slice tomato, two leaves lettuce, one slice onion<br>🍔 5-ounce turkey burger<br>🥄 2 tablespoons ketchup (Approx. 280 cal.)",
    "🍝 1 1/2 cups whole wheat pasta<br>🍅 1 cup tomato sauce<br>🥗 Small garden salad (1 cup mixed greens with one half cup cherry tomatoes topped with one tablespoon balsamic vinaigrette) (Approx. 280 cal.)",
    "🐟 4 ounces trout filet<br>🫘 1 cup steamed green beans<br>🍚 1 cup brown rice<br>🥗 One small garden salad with 1 tablespoon salad dressing (Approx. 280 cal.)",
    "🍖 5 ounces pork loin<br>🥗 Small garden salad with 1 tablespoon vinaigrette<br>🍠 1 medium baked sweet potato<br>🌿 5 asparagus spears (Approx. 280 cal.)",
    "🐟 4-ounce serving of baked or grilled salmon<br>🍚 1 cup brown rice<br>🌿 Five asparagus spears (Approx. 280 cal.)"
  ],
  snack: [
    "🍌 One banana<br>🥛 1 cup plain yogurt with 1 tablespoon honey (Approx. 200 cal.)",
    "🥣 One 7-ounce container 2% plain Greek yogurt with 1/2 cup blueberries (Approx. 200 cal.)",
    "🍐 One fresh pear<br>🌰 1 ounce (22) almonds (Approx. 200 cal.)",
    "🍇 1 cup grapes<br>🌰 1 ounce (14) walnuts (Approx. 200 cal.)",
    "🥕 1 cup baby carrots<br>🌸 1 cup cauliflower pieces<br>🥣 2 tablespoons ranch dressing (Approx. 200 cal.)",
    "🥨 10 whole wheat pretzel twists<br>🥣 3 tablespoons hummus (Approx. 200 cal.)",
    "🥕 1 cup (about 10) baby carrots<br>🥣 3 tablespoons hummus<br>🥖 1/2 piece of pita bread (Approx. 200 cal.)"
  ]
};

//BMI detais what and calcu;ate
const bmiDetails={
  what: ["<p>BMI stands for Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.<br> For more details you can visit <a href='https://my.clevelandclinic.org/health/articles/9464-body-mass-index-bmi'>What is BMI</a>"],
  calculate:["<img src='BMIimg/calPNG.PNG' width =250 height=100>"]

};


//---------------------------End OF BOT RANDOM RESPONSES--------------------------------//


//---------------------------Start of the CALARI MAP----------------------------------------------//
// Create the foodCalories map using the set method
const foodCalories = new Map();

  // Set the food items and their corresponding calories
  foodCalories.set('apple', 'medium - 72 cal');
  foodCalories.set('bagel', '289 cal');
  foodCalories.set('banana', 'medium - 105 cal');
  foodCalories.set('beer', '(regular, 12 ounces) - 153 cal');
  foodCalories.set('bread', '(one slice, wheat or white) - 66 cal');
  foodCalories.set('butter', '(salted, 1 tablespoon) - 102 cal');
  foodCalories.set('carrot', '(raw, 1 cup) - 52 cal');
  foodCalories.set('cheddar cheese', '(1 slice) - 113 cal');
  foodCalories.set('chicken breast', '(boneless, skinless, roasted, 3 ounces) - 142 cal');
  foodCalories.set('chocolate chip cookie', '(from packaged dough) - 59 cal');
  foodCalories.set('coffee', '(regular, brewed from grounds, black) - 2 cal');
  foodCalories.set('cola', '(12 ounces) - 136 cal');
  foodCalories.set('corn', '(canned, sweet yellow whole kernel, drained, 1 cup) - 180 cal');
  foodCalories.set('egg', '(large, scrambled) - 102 cal');
  foodCalories.set('granola bar', '(chewy, with raisins, 1.5-ounce bar) - 193 cal');
  foodCalories.set('green beans', '(canned, drained, 1 cup) - 40 cal');
  foodCalories.set('ground beef patty', '(15 percent fat, 4 ounces, pan-broiled) - 193 cal');
  foodCalories.set('hot dog', '(beef and pork) - 137 cal');
  foodCalories.set('ice cream', '(vanilla, 4 ounces) - 145 cal');
  foodCalories.set('milk', '(2 percent milk fat, 8 ounces) - 122 cal');
  foodCalories.set('mixed nuts', '(dry roasted, with peanuts, salted, 1 ounce) - 168 cal');
  foodCalories.set('oatmeal', '(plain, cooked in water without salt, 1 cup) - 147 cal');
  foodCalories.set('orange juice', '(frozen concentrate, made with water, 8 ounces) - 112 cal');
  foodCalories.set('pizza', '(pepperoni, regular crust, one slice) - 298 cal');
  foodCalories.set('potato', '(medium, baked, including skin) - 161 cal');
  foodCalories.set('potato chips', '(plain, salted, 1 ounce) - 155 cal');
  foodCalories.set('raisins', '(1.5 ounces) - 130 cal');
  foodCalories.set('red wine', '(cabernet sauvignon, 5 ounces) - 123 cal');
  foodCalories.set('rice', '(white, long grain, cooked, 1 cup) - 205 cal');
  foodCalories.set('shrimp', '(cooked under moist heat, 3 ounces) - 84 cal');
  foodCalories.set('spaghetti', '(cooked, enriched, without added salt, 1 cup) - 221 cal');
  foodCalories.set('spaghetti sauce', '(marinara, ready to serve, 4 ounces) - 92 cal');
  foodCalories.set('tuna', '(light, canned in water, drained, 3 ounces) - 100 cal');
  foodCalories.set('white wine', '(sauvignon blanc, 5 ounces) - 121 cal');

//---------------------------End of the CALARI MAP----------------------------------------------//
//---------------------------START of Emotion MAP-----------------------------------------------//
const emotions = new Map();
emotions.set('happy','emotions/happy.png');
emotions.set('sad','emotions/sad.png');
emotions.set('angry1','emotions/angry1.png');
emotions.set('angry2','emotions/angry2.png');
emotions.set('cry','emotions/cry.png');
emotions.set('laugh','emotions/laugh.png');
emotions.set('normalSmile','emotions/normalSmile.png');
emotions.set('smile','emotions/smile.png');
emotions.set('welcome','emotions/welcomeMood.png');

//---------------------------END od Emotion MAP-------------------------------------------------//



//==============================================================================================================//
//==============================================================================================================//




// Function to get the chatbot's response based on user input
function getChatbotResponse(userInput) {
  let response;
  
  // Convert user input to lowercase for case-insensitive matching
  userInput = userInput.toLowerCase();


//check if the user input repeating or not
  if (userInput===previousUserInput){
        repeatCount++;
  }
  else{
    repeatCount=0;
  }
  previousUserInput = userInput;



/////////////bot training ///////////////////////////
// Check if user input is a previously saved question
if (userAnswers[userInput]) {//check previous stored questions
  response = userAnswers[userInput];//retriew the answer and assign to respond
  return response;
}

//check wether the user is know the answer or dont
if (awaitingAnswer===true) {
  //dont know answer
  if (userInput=== "i don't know" || userInput=== "i dont know" ||userInput=== "no"||userInput=== "cant") {
    response = "Oooh.. It's Alright.";
    awaitingAnswer = false;
    renderEmotion('sad');
  } 
  else {
    //know answer
    userAnswers[unknownQuestion] = userInput;//assign the answer to the user answer object
    response = "Thank you for the information!";
    awaitingAnswer = false;
    renderEmotion('welcome');
  }
  return response;
}
/////////////////////end bot training //////////////////

//If same user inputs repeat 4 times then the message wil appear 
  if(repeatCount>=3){
    response = "Eeeew.😡. You bothering me 😒";
    renderEmotion('angry1');
  }
    
//user name 

  else if (naming.includes(userInput)) {
    userName = ''; // Set user's name
    namestates = true;
    renderEmotion('happy');
    response = `${responseObj["greeting"].replace("{{userName}}", userName)}`;

   }
  else if (userInput.includes("my name is")||userInput.includes("i'm ")){
    renderEmotion('happy');
    response = getname(userInput);
  }
  else if(!userName && namestates){
    renderEmotion('happy');
    response = getname(userInput);
     }

// "hi response
  else if (hiInput.includes(userInput)) {
    renderEmotion('normalSmile');
    response = hiResponses[Math.floor(Math.random() * hiResponses.length)].replace("{{userName}}", userName);
  }

//small conversation response

// Check if the user's input matches any key in the commnQuest object
  else if (commnQuest[userInput]){
    response =  commnQuest[userInput]
  }

 
  //check if user input includes BMI related question
  else if(userInput.includes("bmi")||userInput.includes("body mass index")){
     if(userInput.includes("my")){
      if (!bmi){
        renderEmotion('sad');
        response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
      }
      else{
        renderEmotion('normalSmile');
        response=("Your BMI is "+bmi);
      }
    }
     else if (userInput.includes("what is")||userInput.includes("Mean")||userInput.includes("describe")){
      renderEmotion('normalSmile');
      response=bmiDetails.what;

    }
    else if(userInput.includes("calculate")||userInput.includes("how to")){
      renderEmotion('normalSmile');
      response=bmiDetails.calculate;
    }
    else
    {
      renderEmotion('normalSmile'); 
      response="What you need to know about <b>BMI</b>";
    }
  }

  // weight and height input by user
  else if (userInput.includes("weight") && userInput.includes("height")) {
    response=getBMI(userInput);
  }

   //meal for week 
   else if (userInput.includes("week")||userInput.includes("week meal")){
    renderEmotion('cry');
    response = "Sorry 😞, I'm unable to give a meal plan for the whole week";
  }


//Meal plans for a day
  else if (userInput.includes("meals for tomorrow")||userInput.includes("meals for today")||userInput.includes("meal plan for today")||userInput.includes("meal plan")) {
    if (!bmi){
      renderEmotion('normalSmile');
      response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
    }
    //overweight
    else if(weightScale=="overweight"){
      let breakfastOptions = Overweight.breakfast;
      let randomIndexB = Math.floor(Math.random() * breakfastOptions.length);
      let breakfastDay = breakfastOptions[randomIndexB];

      let lunchOptions = Overweight.lunch;
      let randomIndexL = Math.floor(Math.random() * lunchOptions.length);
      let lunchDay = lunchOptions[randomIndexL];

      let dinnerOptions = Overweight.dinner;
      let randomIndexD= Math.floor(Math.random() * dinnerOptions.length);
      let dinnerDay = dinnerOptions[randomIndexD];

      let snackOptions = Overweight.snack;
      let randomIndexS = Math.floor(Math.random() * snackOptions.length);
      let snackDay = snackOptions[randomIndexS];
      renderEmotion('happy');
      response = (" 🍽 <b>Breakfast - </b>"+breakfastDay +"<br>  🍽 <b>Lunch</b> - "+lunchDay+"<br> 🍽 <b>Dinner </b>- "+dinnerDay+"<br> 🍪<b> Snack </b> - "+snackDay+"<br><b> You can take snacks after every meal</b>");
    }

    //underweight
    else if(weightScale=="underweight"){
      let breakfastOptions = Underweight.breakfast;
      let randomIndexB = Math.floor(Math.random() * breakfastOptions.length);
      let breakfastDay = breakfastOptions[randomIndexB];

      let lunchOptions = Underweight.lunch;
      let randomIndexL = Math.floor(Math.random() * lunchOptions.length);
      let lunchDay = lunchOptions[randomIndexL];

      let dinnerOptions = Underweight.dinner;
      let randomIndexD= Math.floor(Math.random() * dinnerOptions.length);
      let dinnerDay = dinnerOptions[randomIndexD];

      let snackOptions = Underweight.snack;
      let randomIndexS = Math.floor(Math.random() * snackOptions.length);
      let snackDay = snackOptions[randomIndexS];
      renderEmotion('happy');
      response = (" 🍽 <b>Breakfast - </b>"+breakfastDay +"<br>  🍽 <b>Lunch</b> - "+lunchDay+"<br> 🍽 <b>Dinner </b>- "+dinnerDay+"<br> 🍪<b> Snack </b> - "+snackDay+"<br><b> You can take snacks after every meal</b>");
    }

      //normal weight 
    else if(weightScale=="normalweight"){
        let breakfastOptions = NormalWeight.breakfast;
        let randomIndexB = Math.floor(Math.random() * breakfastOptions.length);
        let breakfastDay = breakfastOptions[randomIndexB];
  
        let lunchOptions = NormalWeight.lunch;
        let randomIndexL = Math.floor(Math.random() * lunchOptions.length);
        let lunchDay = lunchOptions[randomIndexL];
  
        let dinnerOptions = NormalWeight.dinner;
        let randomIndexD= Math.floor(Math.random() * dinnerOptions.length);
        let dinnerDay = dinnerOptions[randomIndexD];
  
        let snackOptions = NormalWeight.snack;
        let randomIndexS = Math.floor(Math.random() * snackOptions.length);
        let snackDay = snackOptions[randomIndexS];
        renderEmotion('happy');
        response = (" 🍽 <b>Breakfast - </b>"+breakfastDay +"<br>  🍽 <b>Lunch</b> - "+lunchDay+"<br> 🍽 <b>Dinner </b>- "+dinnerDay+"<br> 🍪<b> Snack </b> - "+snackDay +"<br> You can take snacks after every meal");
      }

  }

 
  // breakfast options
  else if (userInput.includes("breakfast")||userInput.includes("morning meal")) {
    if (!bmi){
      renderEmotion('normalSmile');
      response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
    }
    //breakfast for underweight
    else if(weightScale=="underweight"){
      let breakfastOptions = Underweight.breakfast;
      let randomIndex = Math.floor(Math.random() * breakfastOptions.length);
      renderEmotion('normalSmile');
      response = "<b>Beakfast :</b><br>"+breakfastOptions[randomIndex];
     }
     //breakfast for overweight
     else if(weightScale=="overweight"){
      let breakfastOptions = Overweight.breakfast;
      let randomIndex = Math.floor(Math.random() * breakfastOptions.length);
      renderEmotion('normalSmile');
      response = "<b>Beakfast :</b><br>"+breakfastOptions[randomIndex];
     }
     //breakfast for normalweight
     else if(weightScale=="normalweight"){
      let breakfastOptions = NormalWeight.breakfast;
      let randomIndex = Math.floor(Math.random() * breakfastOptions.length);
      renderEmotion('normalSmile');
      response = "<b>Beakfast :</b><br>"+breakfastOptions[randomIndex];
     }
  }
  //lunch options
  else if (userInput.includes("lunch")) {
    if (!bmi){
      renderEmotion('normalSmile');
      response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
    }
    //lunch for underweight
    else if(weightScale=="underweight"){
      let lunchOptions = Underweight.lunch;
      let randomIndex = Math.floor(Math.random() * lunchOptions.length);
      renderEmotion('normalSmile');
      response = "<b>Lunch :</b><br>"+lunchOptions[randomIndex];
     }
     //lunch for overweight
     else if(weightScale=="overweight"){
      let lunchOptions = Overweight.breakfast;
      let randomIndex = Math.floor(Math.random() * lunchOptions.length);
      renderEmotion('normalSmile');
      response = "<b>Lunch :</b><br>"+lunchOptions[randomIndex];
     }
     //lunch for normalweight
     else if(weightScale=="normalweight"){
      let lunchOptions = NormalWeight.breakfast;
      let randomIndex = Math.floor(Math.random() * lunchOptions.length);
      renderEmotion('normalSmile');
      response = "<b>Lunch :</b><br>"+lunchOptions[randomIndex];
     }
  }
  // Dinner options
  else if (userInput.includes("dinner")) {
    if (!bmi){
      renderEmotion('normalSmile');
      response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
    }
    //Dinner for underweight
    else if(weightScale=="underweight"){
      let dinnerOptions = Underweight.dinner;
      let randomIndex = Math.floor(Math.random() * dinnerOptions.length);
      renderEmotion('happy');
      response = "<b>Dinner :</b><br>"+dinnerOptions[randomIndex];
     }
     //Dinner for overweight
     else if(weightScale=="overweight"){
      let dinnerOptions = Overweight.dinner;
      let randomIndex = Math.floor(Math.random() * dinnerOptions.length);
      renderEmotion('happy');
      response = "<b>Dinner :</b><br>"+dinnerOptions[randomIndex];
     }
     //Dinner for normalweight
     else if(weightScale=="normalweight"){
      let dinnerOptions = NormalWeight.dinner;
      let randomIndex = Math.floor(Math.random() * dinnerOptions.length);
      renderEmotion('happy');
      response = "<b>Dinner :</b><br>"+dinnerOptions[randomIndex];
     }
  }
   // Snack options
   else if (userInput.includes("snack")) {
    if (!bmi){
      renderEmotion('normalSmile');
      response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
    }
    //Snack for underweight
    else if(weightScale=="underweight"){
      let snackOptions = Underweight.snack;
      let randomIndex = Math.floor(Math.random() * snackOptions.length);
      renderEmotion('happy');
      response = "<b>Snack :</b><br>"+snackOptions[randomIndex]+"<br> You can take snacks after every meal";
     }
     //Snack for overweight
     else if(weightScale=="overweight"){
      let snackOptions = Overweight.snack;
      let randomIndex = Math.floor(Math.random() * snackOptions.length);
      renderEmotion('happy');
      response = "<b>Snack :</b><br>"+snackOptions[randomIndex]+"<br> You can take snacks after every meal";
     }
     //Snack for normalweight
     else if(weightScale=="normalweight"){
      let snackOptions = NormalWeight.snack;
      let randomIndex = Math.floor(Math.random() * snackOptions.length);
      renderEmotion('normalSmile');
      response = "<b>Snack :</b><br>"+snackOptions[randomIndex]+"<br><b> You can take snacks after every meal</b>";
     }
    }

    

   // ---------------------------- Advices for each BMI catogary-----------------------------------------// 
   else if (userInput.includes("advice")||userInput.includes("loss weight")||userInput.includes("gain weight")||userInput.includes("maintain weight")) {
    if (!bmi){
      renderEmotion('normalSmile');
      response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
    }
    
     //Advices for overweight
     else if(weightScale=="overweight"){ 
      renderEmotion('welcome');
      response =  `<b>Advices for Overweight</b><br>- ${overweightAd.join('<br> •')}.`;
     }
     //Advise for underweight 
     else if(weightScale=="underweight"){
      renderEmotion('welcome');
      response =  `<b>Advices for underweight</b><br> -${underweightAd.join('<br> •')}.`;

      
     }
     // advice for normal weight
     else if(weightScale=="normalweight"){
      renderEmotion('welcome');
      response =  `<b>Advices for Normalweight</b><br>-${normalWeightAd.join('<br> •')}.`;

     }
     
    
  }
  //---------------------------- END Advices for each BMI catogary-----------------------------------------// 
  //-------------------------------------------------------------------------------------------------------//
  // Food calories display 
  else if (userInput.includes("calori" )||userInput.includes("calorie" )){
    if (userInput.includes(extractFoodItem(userInput))) {
      renderEmotion('normalSmile');
      response=getFoodCalories(userInput);
    }
    else if (!bmi){
      renderEmotion('normalSmile');
      response = weightAndHeight[Math.floor(Math.random() * weightAndHeight.length)];
    }
    else if(weightScale=="overweight" && (userInput.includes("take")||userInput.includes("get")||userInput.includes("have"))){
      renderEmotion('normalSmile');
      response = "you should take <b>1200- 1300</b> calories in a day 💪";

    }
    else if(weightScale=="underweight"&& (userInput.includes("take")||userInput.includes("get")||userInput.includes("have"))){
      renderEmotion('normalSmile');
      response = "you should take <b>2000-2200 </b>calories in a day 💪";
    }
    else if(weightScale=="normalweight" && (userInput.includes("take")||userInput.includes("get")||userInput.includes("have"))){
      renderEmotion('normalSmile');
      response = "you should take <b>1500-1600</b> calories in a day 💪";
    }
    
  }

  //bye input
  else if(userInput.includes("bye")){
    renderEmotion('smile');
    response = "Good bye👋 <b>"+userName+"</b><br> <img src='giphy.gif'  alt='' width='120' height='140'> <br>I'm Glad to help you today..😎 " ;
  }
  // thank you reply
  else if(userInput.includes("thank")){
    renderEmotion('welcome');
    response = "You are Welcome<b>" +userName;
  }
  
  else {
   // Handle unknown question
   unknownQuestion = userInput;
   awaitingAnswer = true;
   response = "I don't knowf the answer to that 😢. Can you tell me?";
   renderEmotion('sad');
   return response;   
  }

  // Return the response
  return response;
}


//===================================================================================================================================================//
//==========================================End If else REsponces =============================================================//
//===================================================================================================================================================//



//---------------------------Function to calculate BMI START-----------------------------------------//
//calculation
function calculateBMI(height, weight) {
  return weight / (height * height);
}
//assign values and return the BMI 
function getBMI(userInput) {
  let response = responseObj[userInput.toLowerCase()];
  if (response === undefined) {
    // Check if the user is providing their height and weight
    let match = userInput.match(/(?:my )?(?:height is |height:|height= )(\d+(\.\d+)?) (?: and |, )?(?:my )?(?:weight is |weight:|weight= )(\d+(\.\d+)?)/i);
   if (match) {
      let height = parseFloat(match[1]);
      let weight = parseFloat(match[3]);
      bmi = calculateBMI(height, weight);
      if (bmi<18.5){
       weightScale = "underweight";
       renderEmotion('sad');
       response = `Your <b>BMI</b> is <b>${bmi.toFixed(2)}</b>. Oooopz... You are considered <b> ${weightScale}</b>.`;
      }
      else if(bmi>22.9){
        weightScale = "overweight";
        renderEmotion('cry');
        response =  `Your <b>BMI</b> is <b>${bmi.toFixed(2)}</b>. Oooopz... You are considered as <b> ${weightScale}</b>.`;
      }
      else{
        weightScale = "normalweight";
        renderEmotion('happy');
        response =  `Your <b>BMI</b> is <b>${bmi.toFixed(2)}</b>. Congrats ... You are considered as<b> ${weightScale}</b>.`;
      }
      
    } else {
      response = responseObj["default"];
    }
  }

  return response;
}

//---------------------------Function to calculate BMI END-----------------------------------------//

//--------------------------Calories map functions START------------------//
//extract fooditem from userInput
function extractFoodItem(userInput){
  userInput=userInput.toLowerCase();
  for(let [foodItem, _] of foodCalories){
    if(userInput.includes(foodItem)){
      return foodItem;
    }
  }
  return null;
}

// Function to get the calorie count of a food item
function getFoodCalories(userInput) {
  letfoodItem=extractFoodItem(userInput);
  
  if (foodCalories.has(letfoodItem)) {
    response =  `${letfoodItem}  ${foodCalories.get(letfoodItem)} calories.`;
  }
  else{
  response =  "Sorry, I don't have information about the calorie count of that food item.";
  }
  return response;
}
//--------------------------Calories map functions END------------------//


//---------------------------Emotion function START---------------------//
function renderEmotion(emotion){
  const emotionContainer=document.querySelector(".emotions");
  emotionContainer.innerHTML = "";//To clear previous emotion
  if(emotions.has(emotion)){
    const img=document.createElement("img");
    img.src = emotions.get(emotion);
    emotionContainer.appendChild(img);
  }
}
//---------------------------Emotion function END-----------------------//



//suggesions button questions
const suggestedQuestions = {
  breakfast: ["I need meals for today", "what should i have for lunch?","i need a snack idea","how many calories can I have today"],
  lunch: ["what's good for dinner?", "i'm thinking about snack options", "suggest me a meal plan"],
  dinner: ["what's a good snack options?", "Suggest meals for tomorrow?"],
  snack: ["how many calories in an apple?", "how many calories can I have have today?"],
  bmi: ["what is BMI?", "how to calculate BMI?", "can you explain Body Mass Index?", "what's my BMI?"],
  calories: ["how many calories in an apple?", "how many calories should I take per day?", "what's the calorie count of rice ?"],
  "meal Plan": ["can you provide a meal plan for the week?", "How many calories can i have per day", "meal planning suggestions"],
  "loss weight": ["give an advice for weight loss?", "how many calories can I have have today?"],
  "gain weight": ["how many calories can I have today?", "give a meal planner"],
  "height" : ["Can you suggest meal plan","Suggest me today lunch" ,"Could you please give some advice", "how you calculated BMI", "how many calories can I have today?"],
  advice:[ "How many calories can I have today?", "suggest me a meal plan"]
};


// -----------------suggesion key word extract------------------------//
function extractKeyword(userInput) {
  userInput = userInput.toLowerCase();
  for (let keyword in suggestedQuestions) {
    if (userInput.includes(keyword.toLowerCase())) {
      return keyword;
    }
  }
  return null; // If no keyword is found in the userInput
}

//handle suggestion click
function handleSuggestionClick(suggestion) {
  renderMessage(suggestion, 'user');
  renderChatbotResponse(suggestion); // Get chatbot's response for the suggestion
  setScrollPosition(); // Scroll to bottom after rendering messages
}

// making suggesions
function suggest(response){

  const suggestions = suggestedQuestions[extractKeyword(response)] || [];
  const suggestionContainer = document.querySelector('.suggestion-container');
  suggestionContainer.innerHTML = "";

  // Create new suggestion buttons
  suggestions.forEach(suggestion => {
      const button = document.createElement('button');
      button.textContent = (suggestion);
      button.classList.add('suggestion-button');
      button.onclick = () => handleSuggestionClick(suggestion);
      suggestionContainer.appendChild(button);
  });

      suggestionContainer.style.display = suggestions.length > 0 ? "block" : "none";
}

//User name 
function getname(userInput){
  
  if (!userName && namestates) {
    // Check various ways the user might introduce their name
    if (userInput.startsWith("my name is")) {
      userName = userInput.slice(10); 
    }
    else if( userInput.startsWith("my name"))
      {
        userName = userInput.slice(11); 
      } 
    else if(userInput.startsWith("i am"))
      {
        userName = userInput.slice(5); 
      } 
    else if (userInput.includes("i'm"))
    {
      userName = userInput.slice(3); 
    }
    else
    {
      userName = userInput; // If none of the specific formats were used, take the input as the name
    }
    // Return a welcoming message with the user's name

    return  "Hello 👋 <b>"+ userName  + "</b>, How can I help you today?";

  } 
  else{
    if (userInput.startsWith("my name is")) {
      userName = userInput.slice(10); 
    }
    else if( userInput.startsWith("my name"))
      {
        userName = userInput.slice(11); 
      } 
    else if(userInput.startsWith("i am"))
      {
        userName = userInput.slice(5); 
      } 
    else if (userInput.includes("i'm"))
    {
      userName = userInput.slice(3); 
    }
    
    return "Hello 👋 <b>"+ userName  + "</b>, How can I help you today?";

  }
}