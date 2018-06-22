 // Initialize 
 var config = {
    apiKey: "AIzaSyCjCbpfWKlvz2S3cl3lXYWDmzoS7c9EYRI",
    authDomain: "ehab-e4301.firebaseapp.com",
    databaseURL: "https://ehab-e4301.firebaseio.com",
    projectId: "ehab-e4301",
    storageBucket: "ehab-e4301.appspot.com",
    messagingSenderId: "285355239098"
  };
  firebase.initializeApp(config);
  var db = firebase.database()
  db.ref("/train/1").set({
      name : "test train1",
      destination :"city",
      frequency : 15,
      fristtrain : "10,00,", 
  })
  // code blow add train to firebase
  db.ref("/train/2").set({
    name : "test train2",
    destination :"city",
    frequency : 30,
    fristtrain : "10,00,", 
})
// how we get data out thier
  db.ref('/train/').once('value').then(function(snapshot) {
  console.log(snapshot.val())
  var trains = snapshot.val()
  for(train in trains){
      console.log(trains[train])
      $("#maintrain").append(trainToTr(trains[train]))
  }

 
  });

  // take data for single train turne it to <tr>
  // add that to table


  function trainToTr(data){
      var row =$("<tr>")
      var name =$("<td>").text(data.name)
      row.append(name)
      
      var destination =$("<td>").text(data.destination)
      row.append(destination)

      var frequency =$("<td>").text(data.frequency)
      row.append(frequency)

      var timeData=data.fristtrain.split(",")

      var first=moment().hours(parseInt(timeData[0])).minutes(parseInt(timeData[1])).seconds(0)
      var now=moment()

      var departure = first;
      var diff = departure.diff(now, 'minutes')
      var freqInt = parseInt(data.frequency)

        while(diff < 0) {
            departure.add(freqInt, 'm')
            diff = departure.diff(now, 'minutes')
        }
        
      var next =$("<td>").text(departure.format("h: mm a"))
      row.append(next)

      var minutesAway = $('<td>').text(diff)
      row.append(minutesAway)

      return row

  }

  