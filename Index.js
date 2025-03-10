// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {
    // everything is a try
  try{
    // //check for valid assignmentGroup course_id
    // //check for 0 points_possible
    // //made sure strings are strings
    // verifyData(course,ag,submissions)
    // //make new arrays of objects with valid only data
    //use map instead easier to for each
    // createUserList(ag,submissions)
    // //get sum of possible points and avg of points
    // //save them in the array of objects
    // createUserList.avg = calulateTotals(submissions) as []
    // return userlist

    // here, we would process this data to achieve the desired result.
    verifyData(course, ag, submissions)

    // Get today's date
let currentDate = new Date();
let dueAssignments = [];


for (let i = 0; i < ag.assignments.length; i++) {
  let assignment = ag.assignments[i];
  let dueDate = new Date(assignment.due_at);
  
  // Check if the assignment is due already
  if (dueDate <= currentDate) {
    dueAssignments.push(assignment);
  }
}

const assignments = assignmentGen(dueAssignments)
const students  =  processSubmissions(submissions, assignments)
const result =  calculate(students,assignments,assignmentGroup.group_weight)

    return result
  }
 catch (error) {
    console.error("Error processing", error.message)
    throw error
  }
  }

  function verifyData(courseInfo, assignmentGroup, learnerSubmissions) {
   
    if (!courseInfo) {
      throw new Error("Invalid course information")
    }
    if (typeof courseInfo.id != 'number') {
      throw new Error("Invalid course information")
    }
    if (!courseInfo.name) {
      throw new Error("Invalid course information")
    }

    if (!assignmentGroup) {
      throw new Error("Invalid assignment group")
    }
    if (typeof assignmentGroup.id != 'number') {
      throw new Error("Invalid assignment group")
    }
    if (!assignmentGroup.name) {
      throw new Error("Invalid assignment group")
    }
    
    if (assignmentGroup.course_id != courseInfo.id) {
      throw new Error("Assignment group " + assignmentGroup.id + " does not belong to course " + courseInfo.id)
    }
    
    if (typeof assignmentGroup.group_weight != 'number') {
      throw new Error("Invalid group weight")
    }
    
    // Make sure assignments is array
    //Js not so bad
    if (Array.isArray(assignmentGroup.assignments) == false) {
      throw new Error("Assignments must be an array")
    }
    
   
    if (Array.isArray(learnerSubmissions) == false) {
      throw new Error("Learner submissions must be an array")
    }
  }

  function assignmentGen(assignments) {
    let assignments = new Map()
    
    for (let i = 0; i < assignmentList.length; i++) {
      let assignment = assignmentList[i]
      
      if (typeof assignment.id != 'number') {
        throw new Error("Invalid assignment ID: " + assignment.id)
      }
      
      if (typeof assignment.points_possible != 'number') {
        throw new Error("Invalid points possible for assignment " + assignment.id)
      }
      if (isNaN(assignment.points_possible)) {
        throw new Error("Invalid points possible for assignment " + assignment.id)
      }
      
      assignmentMap.set(assignment.id, {
        id: assignment.id,
        name: assignment.name,
        due_at: new Date(assignment.due_at),
        points_possible: assignment.points_possible
      })
    }
    
    return assignments
}
    
   
  
function processSubmissions(submissions, assignments) { 
    let studentData = new Map() 
    for (let i = 0; i < submissions.length; i++) { 
      let submission = submissions[i] 
      let studentId = submission.learner_id 
      let assignmentId = submission.assignment_id 
      if (assignments.has(assignmentId) == false) { 
        continue 
      } 
      let assignment = assignments.get(assignmentId) 
      if (assignment.points_possible == 0) { 
        console.warn("Assignment " + assignmentId + " has 0 points possible and will be skipped.") 
        continue 
      } 
      let score = submission.submission.score 
      let submittedAt = new Date(submission.submission.submitted_at) 
      let isLate = false 
      if (submittedAt > assignment.due_at) { 
        isLate = true 
      } 
      if (isLate == true) { 
        let penalty = 0.1 * assignment.points_possible 
        score = score - penalty 
        if (score < 0) { 
          score = 0 
        } 
      } 
      let percentageScore = score / assignment.points_possible 
      if (studentData.has(studentId) == false) { 
        let newStudent = { 
          id: studentId, 
          submissions: {} 
        } 
        studentData.set(studentId, newStudent) 
      } 
      let student = studentData.get(studentId) 
      student.submissions[assignmentId] = { 
        score: score, 
        points_possible: assignment.points_possible, 
        percentage: percentageScore 
      } 
    } 
    return studentData 
   }

   function calculate(students, assignments, groupWeight) {
    let results = []
    
    // Get all student IDs and iterate through them
    let studentIds = Array.from(students.keys())
    
    for (let i = 0; i < studentIds.length; i++) {
        let studentId = studentIds[i]
        let studentData = students.get(studentId)
        
        let result = {}
        result.id = studentId
        
        let totalScore = 0
        let totalPossible = 0
        
        let assignmentIds = Object.keys(studentData.submissions)
        for (let j = 0; j < assignmentIds.length; j++) {
            let assignmentId = assignmentIds[j]
            let submission = studentData.submissions[assignmentId]
            
            // Add score to result
            result[assignmentId] = Math.round(submission.percentage * 100) / 100
            totalScore = totalScore + submission.score
            totalPossible = totalPossible + submission.points_possible
        }

        if (totalPossible == 0) {
            result.avg = 0
        } else {
            result.avg = Math.round((totalScore / totalPossible) * 100) / 100
        }
        
        results.push(result)
    }
    
    return results
}
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
  
  console.log(result)
  