// requestuired libraries.
// express, body-parser, mongojs
var express = require('express');
var app = express();
var bodyParser   = require('body-parser');
var mongojs = require('mongojs');

var url = 'mongodb://wizkid96:fabreguz1@ds133127.mlab.com:33127/students';
var db = mongojs(url, ['students']);

var students;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/students', function (request, response) {
	
    if(request.query.id){
		db.students.findOne({ _id: mongojs.ObjectId(request.query.id) }, function (error, student) {
			if (error) {
				response.send(error);
			}
			response.send(student);
		});
    } else {
		db.students.find(function (error, students) {
			if (error) {
				response.send(error);
			}
			response.send(students);
		});
    }
});

app.post('/students', function (request, response) {
	
    let student = request.body;
    if (!student.name) {
        response.status(400);
        response.json({
            "error": "Bad Data"
        });
    } else {
        db.students.save(student, function (error, student) {
            if (error) {
                response.send(error);
            }
            response.send(student);
        });
    }
});

app.delete('/students/:id', function (request, response) {
    db.students.remove({ _id: mongojs.ObjectId(request.params.id) }, function (error, student) {
        if (error) {
            response.send(error);
        }
        response.send(student);
    });
});

app.listen(3000);