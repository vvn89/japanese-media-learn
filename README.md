# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/66b486dc-e2fa-4d9b-88c0-e56126396dd8

# 페르소나
📘 사용자 시나리오
토바에는 JLPT N2를 준비 중인 대학생이다.
토바에는 공부에 지쳐서 애니메이션을 보면서 일본어 표현을 공부하고 싶다.
앱을 켠 토바에는 ‘시험 대비 콘텐츠’ 탭에서 ‘비즈니스 표현이 자주 나오는 뉴스 클립’을 선택한다.
앱은 영상과 함께 한-일 자막을 함께 보여주고, 듣고 싶은 문장을 누르면 해당 부분이 반복 재생된다.
토바에는 생소한 표현을 북마크하고, ‘단어장 추가’ 버튼을 눌러 복습 자료로 저장한다.
시험 전 날, 토바에는 저장한 문장들을 한 번 더 들어보고, 단어 테스트를 진행한다.

# 사용자 스토리
📌 사용자 스토리 1

"JLPT 준비생으로서, 자주 나오는 시험 표현을 실제 미디어에서 학습하고 싶다. 그래서 듣기 실력을 자연스럽게 향상시키고 싶다."

요구사항: JLPT 유형별 미디어 콘텐츠 제공 기능

인수 조건:

Given: 사용자가 앱을 실행하고, JLPT 콘텐츠 탭을 선택했을 때
When: N2 필터를 선택하고 뉴스 클립을 클릭하면
Then: N2 난이도의 콘텐츠와 관련된 클립이 재생되고, 자막이 함께 표시된다
📌 사용자 스토리 2

"학생으로서, 문장을 반복해서 듣고, 표현을 북마크하고 싶다. 그래서 실전 듣기 감각을 기를 수 있다."

요구사항: 문장 단위 반복 듣기 + 문장 북마크 기능

인수 조건:

Given: 사용자가 영상 재생 중이고, 특정 문장을 터치했을 때
When: 반복 듣기 버튼을 누르면
Then: 해당 문장이 반복 재생되고, 사용자는 이를 북마크할 수 있다
📌 사용자 스토리 3

"학생으로서, 북마크한 문장을 복습하고 단어를 테스트하고 싶다. 그래서 시험 전 마무리 정리를 할 수 있다."

요구사항: 단어장 + 테스트 기능

인수 조건:

Given: 사용자가 북마크한 문장과 단어가 저장되어 있을 때
When: 복습하기 버튼을 클릭하면
Then: 문장을 한 번씩 듣고, 단어 뜻을 맞히는 퀴즈 기능이 실행된다

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/66b486dc-e2fa-4d9b-88c0-e56126396dd8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/66b486dc-e2fa-4d9b-88c0-e56126396dd8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

