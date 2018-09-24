var MailParser = require('mailparser').MailParser;
var fs = require('fs');
var async = require('async');

fs.readdir('./in', function (err, filenames) {
  if (err) { throw (err) }

  async.eachSeries(filenames, function (file, callback) {

    var mailparser = new MailParser();
    mailparser.on('end', function (mailObj) {
      fileName = file.slice(0, -4);

      fs.writeFileSync('out/' + fileName + '.html', mailObj.html, 'utf8');
       fs.writeFileSync('out/' + fileName + '.json', JSON.stringify(mailObj), 'utf8');
      callback();
    });

    fs.createReadStream('in/' + file).pipe(mailparser);

  }, function eachSeriesDone() {

    console.log('done');
    process.exit();

  });

});
