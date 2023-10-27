// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract StudentGPAs {
    struct Student {
        string name;
        uint256 rollNumber;
        uint256 gpa;
    }

    mapping(address => Student) public students;

    event GPAUploaded(address indexed studentAddress, string studentName, uint256 rollNumber, uint256 gpa);

    function uploadGPA(string memory _studentName, uint256 _rollNumber, uint256 _gpa) public {
        require(bytes(_studentName).length > 0, "Student name cannot be empty.");
        require(_rollNumber > 0, "Roll number must be greater than 0.");
        require(_gpa >= 0 && _gpa <= 4, "GPA must be in the range of 0 to 4.");

        students[msg.sender] = Student(_studentName, _rollNumber, _gpa);

        emit GPAUploaded(msg.sender, _studentName, _rollNumber, _gpa);
    }

    function getGPA() public view returns (string memory, uint256, uint256) {
        Student storage studentGPA = students[msg.sender];
        return (studentGPA.name, studentGPA.rollNumber, studentGPA.gpa);
    }
}