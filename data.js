// Grade 7 Media Literacy quiz content, transcribed from G7_ML_Quiz_Drafts.md (graded items only).
// `practice` lines are NEW prototype copy (not yet reviewed by curriculum).
// Each lesson's `sim` array is SIMULATED data: 24 fictional students, each as [Ability option index, Sensitivity option index].
// Note: the source draft's L1 Ability feedback says "Leo"; corrected to "Andrew" to match the stem.
window.QUIZ = {
  grade: 7,
  title: "Grade 7 Media Literacy",
  classSize: 24,
  lessons: [
    {
      id: "L1",
      title: "Choosing Sources",
      skill: "Pick a source that is both credible and a good match for the specific information you need.",
      // SIMULATED: 24 fictional students' answers as [Ability option index, Sensitivity option index]
      sim: [[2,0],[2,0],[2,0],[2,0],[2,0],[2,0],[2,1],[2,1],[2,1],[2,1],[2,2],[2,3],[2,3],[0,0],[0,0],[3,0],[0,1],[0,1],[0,2],[0,3],[1,1],[1,3],[3,2],[3,3]],
      questions: [
        {
          id: "L1-ability",
          type: "Ability",
          skill: "Matching a source to what you need",
          stem: "Andrew is writing an essay about how his city council voted on a new skate park last week. Which source best fits what he needs?",
          options: [
            { text: "A general encyclopedia article about the history of skate parks", correct: false, kind: "misconception",
              misconception: "A credible overview source works for any question",
              feedback: "Encyclopedias are great for background, but they won't cover a local vote from last week. Andrew needs a source that reports on recent local events.",
              practice: "Before you pick a source, ask what exactly you need to know: background, or something that just happened? Then choose the source type built for that." },
            { text: "A skateboarding forum where locals share their views on the park", correct: false, kind: "misconception",
              misconception: "People talking about a topic means they're reporting the facts",
              feedback: "Forums can show how people feel, but opinions aren't the same as a report on what happened. Andrew needs facts about the vote.",
              practice: "Take a forum post and a news article about the same event. List which statements are facts and which are opinions or feelings." },
            { text: "A local news article that reports on last week's council meeting", correct: true,
              feedback: "Right! Local news covers recent events in your area, so it matches exactly what Andrew needs to know." },
            { text: "An AI chatbot's quick summary of why towns build skate parks", correct: false, kind: "misconception",
              misconception: "The fastest answer is the best answer",
              feedback: "A quick AI answer might sound helpful, but it answers a different question and may not have recent local news. Match the source to what you need.",
              practice: "Match the source to the question, not to the speed. Ask whether a source could even know the answer, like the result of last week's vote." }
          ]
        },
        {
          id: "L1-sensitivity",
          type: "Sensitivity",
          skill: "Noticing when a credible source doesn't fit",
          scenario: "Sam is helping his mom research affordable laptops they can buy for him to share with his sister. The family is looking for something under $500 that will still work well after a year of use. He finds a long, well-written article from a respected science magazine about how laptop batteries wear down over time. The article includes quotes from engineers. Sam spends an entire afternoon taking careful notes from the article to help his mom.",
          stem: "What is the most important thing for Sam to notice?",
          options: [
            { text: "The article explains batteries, not how specific models hold up", correct: true,
              feedback: "Yes! The source is credible, but it doesn't match his question. Reviews from people who've used these models would fit better." },
            { text: "The article comes from a science magazine that people respect", correct: false, kind: "partial",
              misconception: "Credibility alone makes a source the right choice",
              feedback: "A respected source is a great start. But credible isn't enough. The source also has to answer the question you're asking.",
              practice: "After you find a credible source, add a second check: does it answer the exact question I'm asking?" },
            { text: "The article is long and includes quotes from real engineers", correct: false, kind: "misconception",
              misconception: "More detail and expert quotes mean a source fits any need",
              feedback: "Expert quotes show the article is serious, but they're about batteries in general. That's not what Sam needs to decide.",
              practice: "Don't let length or expert quotes decide for you. Underline the part of a source that answers your question. If you can't find one, it's a mismatch." },
            { text: "He is taking careful notes so he can use them later", correct: false, kind: "partial",
              misconception: "Good research habits matter most",
              feedback: "Taking notes is a smart habit. But before he takes notes, he should check whether this source helps answer his question.",
              practice: "Do the fit check before the note-taking. Spend 30 seconds asking whether a source helps with your question before you spend an afternoon on it." }
          ]
        }
      ]
    },
    {
      id: "L2",
      title: "Evaluating Information Online (Lateral Reading)",
      skill: "Use lateral reading: leave a source and search elsewhere to check its claims and credibility.",
      // SIMULATED: 24 fictional students' answers as [Ability option index, Sensitivity option index]
      sim: [[1,3],[1,3],[1,3],[1,3],[1,3],[1,3],[1,0],[1,0],[1,1],[1,1],[1,1],[1,2],[0,0],[0,1],[0,1],[0,1],[0,3],[0,3],[2,0],[2,0],[2,1],[2,2],[3,1],[3,3]],
      questions: [
        {
          id: "L2-ability",
          type: "Ability",
          skill: "Knowing what lateral reading looks like",
          stem: "Zara sees a post saying a new study proves a popular snack causes headaches. The account has a verified badge and thousands of likes. What would lateral reading look like here?",
          options: [
            { text: "Reading the comments to see if other people agree with the post", correct: false, kind: "misconception",
              misconception: "Checking reactions on the same platform counts as verifying",
              feedback: "Comments show what people think, but they're still on the same post. Lateral reading means leaving it to check other sources.",
              practice: "Try leaving the post. Open a new tab and search the claim. Comments and likes are still inside the source you're checking." },
            { text: "Opening a web browser to search for the study and see what other sources say", correct: true,
              feedback: "Correct! Lateral reading means leaving the post and checking the claim with other sources." },
            { text: "Checking the account's profile to confirm the verified badge is real", correct: false, kind: "misconception",
              misconception: "Trust signals like badges are enough to judge a claim",
              feedback: "Badges are a useful signal, but they don't tell you if a claim is true. Search elsewhere to check what the post says.",
              practice: "Treat a verified badge as a clue about who is posting, not proof that the claim is true. Search for the study itself." },
            { text: "Scrolling through the account's older posts to see if they seem accurate", correct: false, kind: "misconception",
              misconception: "Reading more from the same source is the same as checking it",
              feedback: "Looking deeper at one account keeps you inside that source. Lateral reading means going sideways to other sources.",
              practice: "Practice going sideways. Instead of scrolling a source's older posts, open a new tab and find out what others say about it." }
          ]
        },
        {
          id: "L2-sensitivity",
          type: "Sensitivity",
          skill: "Noticing sources that aren't independent",
          scenario: "Mateo sees a video claiming that a hidden phone setting can double your battery life. He closes the video and searches for the claim to check it. He opens four websites, and all of them say the trick works. When he reads more closely, he sees that each article mentions the same video when it describes the trick. Mateo decides the claim must be true.",
          stem: "What is the most important thing for Mateo to notice?",
          options: [
            { text: "He left the video and searched for the claim somewhere else", correct: false, kind: "partial",
              misconception: "Leaving the source means the claim has been checked",
              feedback: "Leaving the video and searching was a great first step. But what he found still needs a closer look.",
              practice: "Leaving the source is step one. Step two is reading what you find: where did each site get its information?" },
            { text: "He opened several websites instead of trusting just one", correct: false, kind: "partial",
              misconception: "More sites automatically means better evidence",
              feedback: "Checking more than one site is smart. But more sites only help if each one checked the facts on its own.",
              practice: "Count sources that checked the facts themselves, not just the number of sources. Trace each article back to where it got its claim." },
            { text: "The websites explain the phone setting in a lot of detail", correct: false, kind: "misconception",
              misconception: "Detailed information means reliable information",
              feedback: "Details can make something seem trustworthy, but anyone can explain a trick in detail. What matters is where the information came from.",
              practice: "Details aren't proof. For any claim, ask \"where did this information come from?\" and follow it back." },
            { text: "All four articles rely on the same video, so they don't really confirm it", correct: true,
              feedback: "Exactly! If every site is repeating one video, they aren't independent checks. Mateo needs sources that tested the claim themselves." }
          ]
        }
      ]
    },
    {
      id: "L3",
      title: "Bursting the Filter Bubble",
      skill: "Recognize when a feed or your own thinking is narrowing what you see and believe (filter bubbles, echo chambers, confirmation bias).",
      // SIMULATED: 24 fictional students' answers as [Ability option index, Sensitivity option index]
      sim: [[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,2],[0,0],[0,1],[0,3],[0,3],[2,2],[2,2],[2,2],[2,2],[2,2],[2,3],[2,3],[2,0],[2,1],[1,0],[1,3],[3,1],[3,3]],
      questions: [
        {
          id: "L3-ability",
          type: "Ability",
          skill: "Explaining a filter bubble",
          stem: "Jaylen watches a few videos about one basketball player. Now his feed is mostly videos praising that player, and he rarely sees anything critical. What best explains what's happening?",
          options: [
            { text: "The app shows him more of what he's watched, which limits what he sees", correct: true,
              feedback: "Right! That's a filter bubble. The app learns what you like and keeps showing you more of it, so other views get left out." },
            { text: "Most people online agree about this player, so few other views exist", correct: false, kind: "misconception",
              misconception: "A feed reflects what everyone thinks",
              feedback: "Your feed isn't a mirror of what everyone believes. Other people may be seeing very different videos about the same player.",
              practice: "Compare your feed with a classmate's on the same topic. Notice how different the two feeds can be." },
            { text: "Jaylen is choosing to skip the videos that disagree with his opinion", correct: false, kind: "misconception",
              misconception: "Confusing a filter bubble (the app) with confirmation bias (the person)",
              feedback: "Skipping videos would be confirmation bias, but here Jaylen rarely sees critical videos at all. The app is choosing what shows up.",
              practice: "For each example, ask \"who decided what showed up?\" If the app did, it's a filter bubble. If the person did, it's confirmation bias." },
            { text: "The videos in his feed are the most popular, so they're the most accurate", correct: false, kind: "misconception",
              misconception: "Popular content is accurate content",
              feedback: "Popular doesn't mean accurate. And his feed is based on what he's watched, not on what's most true.",
              practice: "Get in the habit of asking \"why is this in my feed?\" Popular or repeated isn't the same as accurate." }
          ]
        },
        {
          id: "L3-sensitivity",
          type: "Sensitivity",
          skill: "Noticing confirmation bias in yourself",
          scenario: "Ellie thinks her town should build a new dog park. She follows several local accounts to keep up with town news. While scrolling, she sees a post saying a study found that dog parks raise nearby home values, and she shares it right away with the comment \"Knew it!\" Earlier that week, she scrolled past a local news story about neighbors' concerns over noise without opening it.",
          stem: "What is the most important thing to notice?",
          options: [
            { text: "The post supports a project that could help her community", correct: false, kind: "misconception",
              misconception: "A good cause makes information trustworthy",
              feedback: "The dog park might be a good idea, but that doesn't make the post accurate. Ask whether you're getting the full picture.",
              practice: "Ask yourself: would I accept this post if it argued the other side? A good cause doesn't check a fact." },
            { text: "She follows local accounts to stay informed about her town", correct: false, kind: "partial",
              misconception: "Following news sources means you see all sides",
              feedback: "Following local news is a good habit. But what matters here is how she reacts to what she sees.",
              practice: "Notice how you react to posts that agree with you and posts that don't. Try opening one story that challenges your view." },
            { text: "She believed the post quickly because it matched what she already thought", correct: true,
              feedback: "Yes! That's confirmation bias. She shared a post that agreed with her and skipped a story that didn't." },
            { text: "The post mentions a study, which gives its claim some support", correct: false, kind: "misconception",
              misconception: "Mentioning a study makes a claim credible",
              feedback: "Saying \"a study found\" can sound convincing, but Ellie didn't check the study. She accepted it because she already agreed.",
              practice: "When a post says \"a study found,\" go find the study. Who ran it, and what did it actually say?" }
          ]
        }
      ]
    }
  ]
};
