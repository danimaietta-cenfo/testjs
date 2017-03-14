'use strict'

// Part 1

function countChar(str, chr){
  const txt = str.value.slice(str.value.indexOf(chr.value) , str.value.lastIndexOf(chr.value) + 1);
  let counter = 0;
  for(var i = 0; i <= txt.length + 1; i++){
      if(txt.charAt(i) === chr.value && chr.value !== ""){
        counter++;
      }
  }
  return counter;
}

// Part 2

let txt = "";
let people = [
  {
     id: 1,
     name: 'Lannister',
     following: [2, 3, 4],
  }, {
     id: 2,
     name: 'Mormont',
     following: [4],
  }, {
     id: 3,
     name: 'Targaryen',
     following: [2],
  }, {
     id: 4,
     name: 'Stark',
     following: [2, 3],
  }
];

function logConnections(name){

  let index = name.value-1, // Index of people array
  following = [],
  followed = [];

  for(var i = 0; i <= people[index].following.length - 1; i++){
      following.push(people[people[index].following[i]-1].name);
  }

  for(var k = 0; k <= 3; k++){
    for(var j = 0; j <= people[k].following.length-1; j++){
      if(name.value == people[k].following[j] && index != k){
        followed.push(people[k].name);
      }
    }
  }

  txt = ` ${people[index].name} is following ${getFollowing(following)} <br>
        ${people[index].name} is followed by ${getFollowed(followed)} <br>
        ${people[index].name} is following and is followed by ${getFollowingAndFollowed(following, followed)} `
  console.log(txt);
  return txt;
}

let getFollowing = following =>{
  let val = ``;
  following.forEach( (foll, i) => {
    if(i == 0){
      val += foll;
    }
    if(i < following.length-1 && i != 0){
      val += `, ` + foll;
    }
    if(i == following.length-1 && following.length > 1){
      val += ` and ` + foll;
    }
  })
  return val;
}

function getFollowed(followed){
  let val = ``;
  if(followed.length == 0){
    return `no one `;
  }else{
    followed.forEach( (foll, i) => {
      if(i == 0){
        val += foll;
        //console.log(txt);
      }
      if(i < followed.length-1 && i != 0){
        val += `, ` + foll;
      }
      if(i == followed.length-1 && followed.length > 1){
        val += " and " + foll;
      }
    })
  }
  return val;
}

function getFollowingAndFollowed(following , followed){
  console.log(following , followed);
  let val = "",
  someone = false,
  count = 0;
  following.forEach( (folling, i) => {
    followed.forEach( (folled, j) => {
      if(folling == folled){
        someone = true;
        if(count == 0){
          val += folling;
        }if(count < following.length-1 && count != 0){
          val += ", " + folling;
        }if(count == following.length-1 && following.length > 1){
          val += " and " + folling;
        }
        count++;
      }
    })
  })
  if(someone == true){
    return val;
  }else{
    return "no one ";
  }

}

// Part 3

const quantPlaces = Math.floor((Math.random() * 10) + 1);

function homeConstructor(){
  let house = { chair : [], porridge : [] };
  for(var i = 0; i < quantPlaces; i++){
    const chair = Math.floor(Math.random() * (80 - 60 + 1) ) + 60;
    const porridge = Math.floor(Math.random() * (60 - 40 + 1) ) + 40;
    house.chair.push(chair);
    house.porridge.push(porridge);
  }
  console.log(house.chair + " | " + house.porridge);
  return tellTheStory(house, 70, 55, 45); // Goldilocks weight, max/min acceptable temperature
}

function tellTheStory(house, weight, maxT, minT){
  let story = ``,
  positive,
  andbut = "",
  eat = false,
  commapoint = ",";
  for(var i = 0; i < quantPlaces; i++){
    if(quantPlaces - i == 1){
      commapoint = "."
    }
    if(i != 0){
      story += `then she tried chair ${i+1}`;
    }else{
      story += "Goldilocks seat on chair 1";
    }
    if(house.chair[i] >= weight){
      story += " and it did hold ";
      positive = 1;
    }else{
      story += " and it didn't hold ";
      positive = 0;
    }
    if(house.porridge[i] > maxT){
      andbut = checkAndBut(0, positive);
      story += ` ${andbut} the plate was to hot${commapoint}`;
    }else if(house.porridge[i] < minT){
      andbut = checkAndBut(0, positive);
      story += ` ${andbut} the plate was to cold${commapoint}`;
    }else{
      andbut = checkAndBut(1, positive);
      story += ` ${andbut} the plate was just right${commapoint}`;
      if(andbut == "and"){
        eat = true;
      }
    }
    story += "<br>";
  }
  if(eat == false){
    story += "And sadly Goldilocks went for another walk at the woods..."
  }
  return story;
}

function checkAndBut(num, positive){
  if(num == positive){
    return "and";
  }else{
    return "but";
  }
}
