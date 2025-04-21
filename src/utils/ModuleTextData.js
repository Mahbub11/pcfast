import { LIVE_URL, S3_BASE_URL } from "../config";

export const moduledata = [
  {
    module:'reading',
    heading: "Guide for Reading Module in Duolingo English Test",
    // subHeading: "Duolingo Reading English Test Guide",
    subPara:
      "The Duolingo English Test integrates reading skills with other abilities through Literacy and Comprehension subscores, requiring reading and answering questions, unlike other DET tests. Let take an examine the various question formats you may expect in the DET.",

    content: [
      {
        heading: "Read and Complete",
        subHeading:
          "You have to complete this challenge by adding the missing letters to specific words in a given text. Your vocabulary, sentence structure, and grammar will all be evaluated on this language test.",
        image: `${S3_BASE_URL}/duolingo/module/read and complete duolingo.png`,   
        completeGuideline:{
          url: `${LIVE_URL}duolingo/module/guideline/read-and-complete`,
          text: "Complete Guide for Read and Complete in duolingo English test"
        }
      },
      {
        heading: "Read and Select",
        subHeading:
          "You have to select only the appropriate terms from a list provided by DET; some of the terms are genuine, while others are pseudowords.",
          image: `${S3_BASE_URL}/duolingo/module/read and select duolingo.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/read-and-select`,
            text: "Complete Guide for Read and Select in duolingo English test"
          }
      },
      {
        heading: "Interactive Reading",
        subHeading:
          "The “Interactive Reading” section was added to the Duolingo English Test in 2022. This part of the test is more complicated than the other parts, so it is important to understand how it works. This section consists of 6 questions that all relate to the same passage.",
          image: `${S3_BASE_URL}/duolingo/module/complete the sentence duolingo.png`,
      },
      {
        heading: "",
        subHeading:
          "",
          image: `${S3_BASE_URL}/duolingo/module/complete-the-passage-duolingo-english-test.png`,
      },
      {
        heading: "",
        subHeading:
          "",
          image: `${S3_BASE_URL}/duolingo/module/highlight-the-answer-duolingo-english-test.png`,
      },
      {
        heading: "",
        subHeading:
          "",
          image: `${S3_BASE_URL}/duolingo/module/identify-the-idea-duolingo-english-test.png`,
      },
      {
        heading: "",
        subHeading:
          "",
          image: `${S3_BASE_URL}/duolingo/module/title-the-passage-duolingo-english-test.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/interactive-reading`,
            text: "Complete Guide for Interactive Reading in duolingo English test"
          }
      },
      
    ],
  },

  {
    module:'writing',
    heading: "Guide for Writing Module in Duolingo English Test",
    // subHeading: "Duolingo Writing English Test Guide",
    subPara:
      "The Duolingo writing example questions have three subtasks. Write About the Photo,Read then Write, and Writing Sample are some of them. The first test requires candidates to describe an image; the other two need them to read a prompt and write a response. The writing sample's entire text is sent to the admissions committee of the university where the test-taker plans to enroll. The information of three different kinds of Duolingo writing sample questions are provided below:      ",

    content: [
      {
        heading: "Write About the photo (Adaptive Question)",
        subHeading:
          "Candidates are required to describe a picture in this picture description task. The photographs used to create the visuals are public domain images of actual scenes, some in color and some in black and white. Graphical representations such as line drawings or clip art are absent.Candidates are required to describe the image in the provided box.",
          image: `${S3_BASE_URL}/duolingo/module/write about the photo duolingo.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/write-about-the-photo`,
            text: "Complete Guide for Write about the Photo in duolingo English test"
          }
      },
      {
        heading: "Read and then write (Adaptive question)",
        subHeading:
          "Candidates have five minutes to write as much as they like on this subject, but they mustwrite at least fifty words. They can only proceed to the next section of the test after typing50 words. Participants are required to write on the following subjects with cues:   1.To describe, discuss and explain  2.To make argument 3.To recollect the past incident",
          image: `${S3_BASE_URL}/duolingo/module/read then write duolingo.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/read-then-write`,
            text: "Complete Guide for Read then Write in duolingo English test"
          }
      },
      {
        heading: "Writing Sample",
        subHeading:
          "The very last task on the Duolingo English Test is writing sample. You will have two or three minutes to respond to each of the written questions. Candidates will have thirty seconds to decide which of the many topics to write about will be covered.This section is not graded by the computer. The institutions receive the video footage and responses directly for analysis.",
          image: `${S3_BASE_URL}/duolingo/module/writing-sample-duolingo-english-test.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/writing-sample`,
            text: "Complete Guide for Writing Sample in duolingo English test"
          }
      },
      
    ],
  },


  {
    module:'speaking',
    heading: "Guide for Speaking Module in Duolingo English Test",
    // subHeading: "Duolingo Speaking English Test Guide",
    subPara:
      "The Duolingo English Test (DET) consists of four main categories, each designed to evaluate a different aspect of speaking English. There are four main Duolingo speaking questions on the Duolingo Speaking test: ",

    content: [
      {
        heading: "Speak About the Photo",
        subHeading:
          "As the name suggests, candidates will be given a photo, which they must then analyze on their own and use to articulate their response to the prompt. The question and the photowill be displayed here for a total of 20 seconds before moving to the recording screen.",
          image: `${S3_BASE_URL}/duolingo/module/speak about the photo duolingo.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/speak-about-the-photo`,
            text: "Complete Guide for Speak about the Photo in duolingo English test"
          }
      },
      {
        heading: "Read Aloud",
        subHeading:
          "Applicants must read aloud a section of text in this section. Candidates are encouraged to use clear vocabulary and pronunciation.",
          image: `${S3_BASE_URL}/duolingo/module/read aloud duolingo.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/speak-aloud`,
            text: "Complete Guide for Read Aloud in duolingo English test"
          }
      },
      {
        heading: "Read Then Speak",
        subHeading:
          "Candidates will be required to read through a written prompt that appears on their monitor prior to speaking. All applicants will have 30 seconds after the reading to respond to some Duolingo speaking topics that have been presented. In addition, the instructions for the question will be provided totest-takers approximately 20 seconds prior to the start of the timer.",
          image: `${S3_BASE_URL}/duolingo/module/read-then-speak-duolingo-english-test.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/read-then-speak`,
            text: "Complete Guide for Read then Speak in duolingo English test"
          }
      },
      {
        heading: "Listen and Speak",
        subHeading:
          "Similar to the read and speak task, candidates will be required to repeatedly listen to and replay an audio cue before responding verbally. The Duolingo speaking questions instructions will be sent to applicants approximately 20 seconds before the answer timer begins.",
          image: `${S3_BASE_URL}/duolingo/module/listen then speak duolingo.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/listen-then-speak`,
            text: "Complete Guide for Listen then Speak in duolingo English test"
          }
      },
      {
        heading: "Speaking Sample",
        subHeading:
          "You must choose one of the two prompts shown on the screen to complete the Speaking Sample section of the ungraded portion of the Duolingo English Test.You must read, evaluate, and choose one of the two options provided since the instructions will display for 30 seconds before the recording begins.",
          image: `${S3_BASE_URL}/duolingo/module/speaking-sample-duolingo-english-test.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/speaking-sample`,
            text: "Complete Guide for Speaking Sample in duolingo English test"
          }
      },

     
    ],
  },

  {
    module:'listening',
    heading: "Guide for Listening Module in Duolingo English Test",
    // subHeading: "Duolingo Listening English Test Guide",
    subPara:
      "The following question types will be utilized to assess your listening comprehension during the less than hour-long Duolingo English test:",

    content: [
      {
        heading: "Listen and Type",
        subHeading:
          "This dictation exam measures the ability to identify and retain specific words for spokenlanguage comprehension, and has been linked to language learner intelligibility in speech output, as participants must listen to and type out a spoken sentence or paragraph.",
          image: `${S3_BASE_URL}/duolingo/module/listen and type duolingo.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/listen-then-type`,
            text: "Complete Guide for Listen and Type in duolingo English test"
          }
      },
      {
        heading: "Interactive Listening",
        subHeading:
          "The extended speaking task involves answering an ezoic listening question for at least 30 seconds, ensuring complete and clear responses as they will be recorded.",
          image: `${S3_BASE_URL}/duolingo/module/listen-and-respond-duolingo-english-test.png`,
          completeGuideline:{
            url: `${LIVE_URL}duolingo/module/guideline/interactive-listening`,
            text: "Complete Guide for Interactive Listening in duolingo English test"
          }
      },
      

     
    ],
  },



];
