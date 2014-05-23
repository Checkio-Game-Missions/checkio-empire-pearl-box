"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "1. Basics": [
        {"input": ('bbw', 3),
         "answer": 0.481,
         "explanation": 0.48},

        {"input": ('wwb', 3),
         "answer": 0.519,
         "explanation": 0.52},

        {"input": ('www', 3),
         "answer": 0.556,
         "explanation": 0.56},

        {"input": ('bbbb', 1),
         "answer": 0.0,
         "explanation": 0.0},

        {"input": ('wwbb', 4),
         "answer": 0.5,
         "explanation": 0.5},

        {"input": ('bwbwbwb', 5),
         "answer": 0.481,
         "explanation": 0.48},
    ],
    "2. Extra": [
        {"input": ('bwwbbbbw', 4),
         "answer": 0.447,
         "explanation": 0.45},

        {"input": ('bbb', 5),
         "answer": 0.494,
         "explanation": 0.49},

        {"input": ('bwbwbb', 4),
         "answer": 0.451,
         "explanation": 0.45},

        {"input": ('wbbb', 3),
         "answer": 0.438,
         "explanation": 0.44},

        {"input": ('wwbbwbwbwb', 2),
         "answer": 0.5,
         "explanation": 0.5},

        {"input": ('wbwwwww', 2),
         "answer": 0.755,
         "explanation": 0.76},

        {"input": ('wbwwwwwwwb', 4),
         "answer": 0.654,
         "explanation": 0.65},

        {"input": ('bwb', 2),
         "answer": 0.444,
         "explanation": 0.44},

        {"input": ('bbbbw', 5),
         "answer": 0.461,
         "explanation": 0.46},

        {"input": ('wbwwwwwb', 3),
         "answer": 0.641,
         "explanation": 0.64},
    ],
    "3. Weird": [
        {"input": ('w', 1),
         "answer": 1.0,
         "explanation": 1.0},

        {"input": ('b', 1),
         "answer": 0.0,
         "explanation": 0.0},

        {"input": ('w', 2),
         "answer": 0.0,
         "explanation": 0.0},

        {"input": ('b', 2),
         "answer": 1.0,
         "explanation": 1.0},

        {"input": ('wwwwwwwwwwww', 4),
         "answer": 0.789,
         "explanation": 0.79},

        {"input": ('bbbbbbbbbbbb', 5),
         "answer": 0.259,
         "explanation": 0.26},

        {"input": ('wwwwwwwwwwwwwwwwwwww', 20),
         "answer": 0.567,
         "explanation": 0.57},
        {"input": ('bbbbbbbbbbbbbbbbbbbb', 20),
         "answer": 0.432,
         "explanation": 0.43},


    ],
    "4. Extra": [
        {"input": ('wwwwwbwbwbbwbbwwbw', 11),
         "answer": 0.534,
         "explanation": 0.53},

        {"input": ('wwbwwwbbwbbwww', 10),
         "answer": 0.536,
         "explanation": 0.54},

        {"input": ('bbwbwbbwbwwbw', 11),
         "answer": 0.493,
         "explanation": 0.49},
    ]

}
