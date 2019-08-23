const knex = require("./knex");
const _ = require("underscore")

const configRoutes = [


        //for git checking
      //get method for college percent
      {
        method: 'GET',
        path: '/college',
        handler: async (req, h) => {
            var i = req.payload;
            console.log(i)
            var data = await knex.raw(`SELECT college.colg_name as name ,(SUM(IF (results.credit="p",1,0))/ COUNT(results.percent))* 100 AS y , LOWER(college.colg_name) as drilldown FROM results INNER JOIN students on results.std_id=students.std_id INNER JOIN link on students.std_id=link.l_id INNER JOIN college on link.colg_id=college.colg_id GROUP BY college.colg_name`)
            return data[0];
        }
    },

     //get method for dept percent
     {
        method: 'GET',
        path: '/dept',
        handler: async (req, h) => {
            var i = req.payload;
            console.log(i)
            var data = await knex.raw(`SELECT college.colg_name as id,branches.branch_name as name, (SUM(IF (results.credit="p",1,0))/ COUNT(results.percent))* 100 as y, lower(concat(college.colg_name,branches.branch_name)) as drilldown FROM results INNER JOIN students on results.std_id=students.std_id INNER JOIN link on students.std_id=link.l_id INNER JOIN branches on link.br_id=branches.br_id INNER JOIN college on college.colg_id= link.colg_id GROUP BY college.colg_name ,branches.branch_name`)
            return data[0];
        }
    },

       //get method for year percent
       {
        method: 'GET',
        path: '/year',
        handler: async (req, h) => {
            var i = req.payload;
            console.log(i)
            var data = await knex.raw(`SELECT college.colg_name,branches.branch_name, year.yr as name , (SUM(IF (results.credit="p",1,0))/ COUNT(results.percent))* 100 as y ,lower(concat(college.colg_name,branch_name,year.yr))as drilldown FROM results INNER JOIN students on results.std_id=students.std_id INNER JOIN link on students.std_id=link.l_id INNER JOIN branches on link.br_id=branches.br_id INNER JOIN college on college.colg_id= link.colg_id INNER JOIN year on year.yr_id=link.yr_id  GROUP BY college.colg_name ,branches.branch_name ,year.yr`)
            return data[0];
        }
    },

        //get method for  sect percent
        {
            method: 'GET',
            path: '/sect',
            handler: async (req, h) => {
                var i = req.payload;
                console.log(i)
                var data = await knex.raw(`SELECT college.colg_name,branches.branch_name, year.yr , sections.sect_name as name ,students.std_name,results.percent, (SUM(IF (results.credit="p",1,0))/ COUNT(results.percent))* 100 as y,lower(concat(college.colg_name,branch_name,year.yr,sections.sect_name))as drilldown FROM results INNER JOIN students on results.std_id=students.std_id INNER JOIN link on students.std_id=link.l_id INNER JOIN branches on link.br_id=branches.br_id INNER JOIN college on college.colg_id= link.colg_id INNER JOIN year on year.yr_id=link.yr_id INNER join sections on sections.sect_id =link.sect_id GROUP BY college.colg_name ,branches.branch_name ,year.yr,sections.sect_name`)
                return data[0];
            }
        },


    
];

module.exports = configRoutes;