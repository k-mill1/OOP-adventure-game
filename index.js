class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
  }

  get name () {
    return this._name;
  }

  get description () {
    return this._description;
  }

  get character () {
    return this._character
  }

  set name (value) {
    if (value.length < 4) {
      alert('Name needs to be at least 4 characters');
      return;
    }
    this._name = value;
  }

  set description (value) {
    if (value.length < 4) {
      alert('Name needs to be at least 4 characters');
      return;
    }
    this._description = value;
  }

  set character (value) {
    this._character = value;
  }

  describe () {
    return 'You have entered the ' + this._name + '. It is a ' + this._description
  }

  linkRoom (direction, room) {
    this._linkedRooms[direction] = room;
  }

  move (direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't got that way")
      return this;
    }
  }

  getDetails () {
    const entries = Object.entries(this._linkedRooms);
    const details = [];
    for (const [direction, room] of entries) {
      const text = 'The ' + room._name + ' is to the ' + direction;
      details.push(text);
    }
    return details;
  }
}

const Hallway = new Room('hallway');
Hallway.description = 'long narrow room with large portraits on the walls';
const Kitchen = new Room('kitchen');
Kitchen.description = 'large spacious room with worktops on all sides and a large table in the middle';
const Pantry = new Room('pantry');
Pantry.description = 'small room filled with food and drinks';
const Lounge = new Room('lounge');
Lounge.description = 'large room with a chandelier in the ceiling and a red velvet sofa next to a fireplace';
const Bedroom = new Room('bedroom');
Bedroom.description = 'spacious room with a large red canopy bed in the middle';
const Closet = new Room('closet');
Closet.description = 'small room with a large mirror in the front and piles of clothes everywhere';
const Courtyard = new Room('courtyard');
Courtyard.description = 'large green space with blossoming apple trees';
const Cave = new Room('cave');
Cave.description = 'dark creepy space with water dripping from the walls';

Hallway.linkRoom('west', Kitchen);
Hallway.linkRoom('east', Lounge);
Hallway.linkRoom('north', Courtyard);
Kitchen.linkRoom('east', Hallway);
Kitchen.linkRoom('north', Pantry);
Pantry.linkRoom('south', Kitchen);
Lounge.linkRoom('west', Hallway);
Lounge.linkRoom('north', Bedroom);
Bedroom.linkRoom('south', Lounge);
Bedroom.linkRoom('north', Closet);
Closet.linkRoom('south', Bedroom);
Courtyard.linkRoom('north', Cave);
Courtyard.linkRoom('south', Hallway);
Cave.linkRoom('south', Courtyard);

function displayRoom (room) {
  const content = room.describe();
  document.getElementById('textarea').innerHTML = content;
  document.getElementById('ui').focus();
}
 

      // class Character {
      //   constructor (name, description, conversation) {
      //     this._name = name;
      //     this._description = description;
      //     this._conversation = conversation;
      //   }
      
      //   get name () {
      //     return this._name
      //   }
      
      //   get description () {
      //     return this._description
      //   }
      
      //   get conversation () {
      //     return this._conversation
      //   }
      
      //   set name (value) {
      //     this._name = value
      //   }
      
      //   set description (value) {
      //     this._description = value
      //   }
      
      //   set conversation (value) {
      //     this._conversation = value
      //   }
      
      //   describe () {
      //     return 'In front of you is a ' + this._name + ' who is ' + this._description
      //   }
      
      //   talk () {
      //     return this._conversation
      //   }
      // }
      
      // class Enemy extends Character {
      //   constructor (name, description, conversation, weakness) {
      //     super(name, description, conversation);
      //     this._weakness = weakness;
      //   }
      
      //   fight (item) {
      //     if (item == this._weakness) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   }
      // }
      
      // const Troll = new Enemy('troll', 'hungry', 'ROAAAR!!', 'apple')
      // console.log(Troll.fight('apple'))
      
      // class Item {
      //   constructor (name, description) {
      //     this._name = name;
      //     this._description = description;
      //   }
      
      //   get name () {
      //     return this._name
      //   }
      
      //   get description () {
      //     return this._description
      //   }
      
      //   set name (value) {
      //     this._name = value
      //   }
      
      //   set description (value) {
      //     this._description = value
      //   }
      // }
      
      
      function startGame () {
        let currentRoom = Hallway;
        displayRoom(currentRoom);
      
        document.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            const command = document.getElementById('ui').value;
            const directions = ['north', 'south', 'east', 'west']
            if (directions.includes(command.toLowerCase())) {
              currentRoom = currentRoom.move(command.toLowerCase())
              displayRoom(currentRoom);
            } else {
              document.getElementById('ui').value = ""
              alert('that is not a valid command, please try again')
            }
          }
        });
      }
      startGame()