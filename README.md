# أمناء أكفّاء - Omana akfa Conference

This project is part of a series of conferences. These conferences are held over three days each year.
My first version of this project was in **January 2023**

## `User roles`
There are two user roles in the website:
- Organizer: They can control the website data
- Member: They can see them results and interact with the things that the organizers selected


I have made three versions over two years for this conference series, You can see the first version in my portfolio it called: "[**Secondary Retreat**](/portfolio/secondary-retreat)".

This project has were used by over **300 members**

The conference takes you on a journey to deliver a specific topic over three days, The conference organizers do their best to convey the desired idea to the conference members, they decided to make the conference more interactive.


They brought me to do the following:
- [**Quizzes**](https://omanaakfa.vercel.app/quiz)
- [**Gallery**](https://omanaakfa.vercel.app/gallery)
- Score Page
- Dashboard to control the score and quizzes results


### [**The Quizzes**](https://omanaakfa.vercel.app/quiz)
In order to ensure that the information is conveyed, the conference organizers decided to conduct simple quizzes as a test.
Let's clarify the **`quizzes`** features.
This feature designed to manage the score of each member on the conference as we go far on the conference it be hard to manually score up or down each member so this web application development by me to manage [**Quizzes**](https://omanaakfa.vercel.app/quiz) of these members and automatically score up each member by its name after ending the quiz.

|          | Organizers | Members |
| ---- | ---------- | --------- |
| **Add/Remove quiz** | Can delete or add any quizzes | Can not add or remove yet |            |
| **Quiz Activity** | The Organizers after adding multiple quizzes they can control the specific quiz they want to display as the active quiz ready for interact | They only can see the quiz to start test themselves |
| **Quiz Result** | Can see all the score of the members because it saved in dashboard can see in anytime | Can only see the `score` immediately after they submitted and **Can't** **DIRECTLY** go back to see the score again or see other members quiz result |

### [**The Score**](https://omanaakfa.vercel.app/score)
As I mentioned before the organizers strive to make the conference more fun. They make a virtual score completely controlled on the website each member strive to get the highest score.

> **The Score Page contains all the members that subscribed to the conference So It considered as the main Page of the Website**

> The Score page show up the result of the **Personal score**. The Personal Score: is the result of the quizzes mixed by A score that is given by the organizers

|          | Organizers | Members |
| ---- | ---------- | --------|
| **Add/Remove Member** | Can completely Add a member and Remove any member from the score table | Can not add or remove |
| **Score Up/Down** | Can completely control [**The Score**](https://omanaakfa.vercel.app/score) of each Member | Only **SEE** and **can not** control their scores |
| **Edit a member** | Full control on editing any member data | **Can not** edit |

### [**The Gallery**](https://omanaakfa.vercel.app/gallery)
Memories are the only thing left of the funny moments. This feature get access to all the participants of the conference to upload images for memory.
Only **The Organizers** can delete the uploaded photos

### Backend managements 
Using react in this case will be so good choice For me especially SEO is not important to me. so I decided to use react with APIs.

As a backend management I used:
- MongoDB (As a DB)
- Node js & Express (For The Server)
- firebase storage (For the Gallery)