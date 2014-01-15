//if the database is empty on server start, create some sample data.

Meteor.startup(function () {
  if (Feels.find().count() === 0) {
    var data = [
      {username: "Bob",
        anon: false,
        text: "Today is a fabulous day. I love everyone.",
        emotion: "Happy",
        hearts: 0,
        timestamp: null
      },
      {username: "Perry",
        anon: true,
        text: "Well today was just okay.",
        emotion: "Meh",
        hearts: 0,
        timestamp: null
      },
      {username: "Kat",
        anon: false,
        text: "I feel really anxious about my 7.012 final. Boooo :(",
        emotion: "Sad",
        hearts: 0,
        timestamp: null
      },
      {username: "Chad",
        anon: false,
        text: "I just got a huge chocolate chip cookie. Food is yummy",
        emotion: "Happy",
        hearts: 0,
        timestamp: null
      },
      {username: "Bob",
        anon: true,
        text: "Today is still fabulous. My life is just awesome!!!",
        emotion: "Happy",
        hearts: 0,
        timestamp: null
      }
    ];
    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var feel = data[i];
      Feels.insert({username: feel.username,
        anon: feel.anon,
        text: feel.text,
        emotion: feel.emotion,
        hearts: Math.floor(Random.fraction()*10),
        timestamp: timestamp,
      });
      timestamp += 1; // ensure unique timestamp.
    }
  }
});
