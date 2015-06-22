meta4beta
---------

A self contained runtime for prototyping applications using meta4 JSON wireframes.

For a basic tutorial on building your UI, check out: https://github.com/troven/meta4ux/wiki


1) Install from github

<pre>
$ git clone https://github.com/troven/meta4beta.git
$ cd meta4beta
$ npm install -g
</pre>

2) Start your meta4 server, type:

<pre>
$ meta4
</pre>

Your server should start-up and announce that it's listening on port 8080.

4) Browse the demo at:

<pre>
http://localhost:8080/meta4beta/
</pre>

5) Change the appropriate entries in package.json and meta4.json to match your project.

6) Restart your meta4 server. A CTRL-C followed by ./bin/meta4.sh

If you're using on Windows, or you want to roll your own. 

<pre>
C:\meta4> node .
</pre>

7) Browse the demo at:

<pre>
http://localhost:8080/your_projet/
</pre>

8) A bare bones example is included in ./src/

Rip & replace to bring your ideas to life.

Take a look at the following files to get the basic idea:

<pre>
Models:
./src/models/meta/meta4users.json

Scripts:
./src/scripts/hello.js
./src/scripts/world.js

Templates:
./src/templates/client/crud_items.html

Views:
./src/views/crud.json
./src/views/footer.json
./src/views/header.json
./src/views/hello.json
./src/views/home.json
./src/views/world.json
</pre>


