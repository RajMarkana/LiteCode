import React, { useState,useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { IoCopy } from "react-icons/io5";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaLink } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

const apiKey = 'AIzaSyBCOZZ83Mu0kxg-kHccgUEGbLYBlHy2A0g';
const genAI = new GoogleGenerativeAI(apiKey);

const App = () => {
  const [ScreenLoad, setScreenLoad] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [SimplifiedCode, setSimplifiedCode] = useState('');
  const [CodeExplanation, setCodeExplanation] = useState();
  const [QuestionAnswers, setQuestionAnswers] = useState();
  const [LoadingText, setLoadingText] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [isExplanationCopied, setIsExplanationCopied] = useState(false);
  const [isQuestionsCopied, setIsQuestionsCopied] = useState(false);
  const [CustomPrompt, setCustomPrompt] = useState("");

  const handleInputChange = (newValue) => {
    setUserInput(newValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenLoad(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const submitQuery = async () => {
    if (!showLoading) {
      try {
        setIsResponse(false);
        setShowLoading(true);
        setLoadingText("Simplifying...")
        const gemini = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const CodePrompt = `Without changing or removing any functionality , design and comments, please Simplify the following code also you can improve code quality using coding standard and complexity and provide only the simplified code as output with proper format:
        ${userInput} ${CustomPrompt.trim() != "" ? (", And Do " + CustomPrompt) : ("")} `;
        // alert(CodePrompt);
        const CodeResult = await gemini.generateContent(CodePrompt);
        const CodeResponse = await CodeResult.response;
        const CodeText = await CodeResponse.candidates[0].content.parts[0].text;
        setSimplifiedCode(CodeText);

        setLoadingText("Generating Explanation...")
        const ExplainPrompt = `Now give me full Explanation of ${CodeText} this code , And provide only the Explanation as output with proper format.`;
        const ExplainResult = await gemini.generateContent(ExplainPrompt);
        const ExaplainResponse = await ExplainResult.response;
        const ExplainText = await ExaplainResponse.candidates[0].content.parts[0].text;
        setCodeExplanation(ExplainText)

        setLoadingText("Generating Interview Questions...")
        const QuestionPrompt = `Now give me minimum 5 and maximum 10 relevant interview questions and questions answers from this Code : ${CodeText} and Explanation ${ExplainText},And provide only the Question and Answers as output with proper format.`;
        const QuestionResult = await gemini.generateContent(QuestionPrompt);
        const QuestionResponse = await QuestionResult.response;
        const QuestionText = await QuestionResponse.candidates[0].content.parts[0].text;
        setQuestionAnswers(QuestionText)

        setIsError(false);
        setErrorMessage('');
        setShowLoading(false);
        setIsResponse(true);
      } catch (error) {
        setShowLoading(false);
        setIsError(true);
        setErrorMessage('Something Went Wrong ! Try Again Later');
        // console.log('Something Went Wrong', error);
      }
    }

  };

  const copyToClipboardCode = async () => {
    try {
      await navigator.clipboard.writeText(SimplifiedCode);
      setIsCodeCopied(true);
      setTimeout(() => {
        setIsCodeCopied(false);
      }, 1000);

    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const copyToClipboardExplanation = async () => {
    try {
      await navigator.clipboard.writeText(CodeExplanation);
      setIsExplanationCopied(true);
      setTimeout(() => {
        setIsExplanationCopied(false);
      }, 1000);

    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const copyToClipboardQuestions = async () => {
    try {
      await navigator.clipboard.writeText(QuestionAnswers);
      setIsQuestionsCopied(true);
      setTimeout(() => {
        setIsQuestionsCopied(false);
      }, 1000);

    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      {
        ScreenLoad ? (<div className='h-screen bg-white flex justify-center items-center'>
          <img src="./LiteCode.gif" width={200} alt="" />
        </div>) : (

          <div className=' text-secondary'>
            <header className='flex px-4 justify-between items-center'>
              <img src="./1.png" className='w-20' alt="" />
              <div className='flex gap-4 text-xl'>
                <a href="https://www.facebook.com/profile.php?id=100071721978203" target='_blank' className='transition-all hover:text-primary_1'><FaFacebookF /></a>
                <a href="https://www.instagram.com/rajmarkana13" target='_blank' className='transition-all hover:text-primary_1'><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/rajmarkana/" target='_blank' className='transition-all hover:text-primary_1'><FaLinkedinIn /></a>
                <a href="http://rajmarkana.rf.gd/" target='_blank' className='transition-all hover:text-primary_1'><FaLink /></a>
              </div>
            </header>
            <div className='h-full overflow-auto'>
              <main className='gap-4 p-4'>
                <div>
                  <AceEditor
                    placeholder='// Code Here'
                    mode='javascript'
                    theme='dracula'
                    onChange={handleInputChange}
                    name='codeEditor'
                    editorProps={{ $blockScrolling: true }}
                    width='100%'
                    fontSize={16}
                    className=' rounded-2xl shadow-4xl'
                    value={userInput}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true,
                      tabSize: 2,
                    }}
                  />

                  <div className='my-10  grid grid-cols-12 gap-6'>

                    <div className='sm:col-span-10 col-span-12'>
                      <label htmlFor="">
                        Custom Prompt (Optional)
                      </label><br />
                      <input type="text" value={CustomPrompt} onChange={(e) => { setCustomPrompt(e.target.value) }} className='w-full outline-none border  rounded-full border-gray-300  p-3' placeholder='eg. Add Confirm Box' />
                    </div>

                    <button
                      className='mt-4 sm:col-span-2 col-span-12 bg-primary_1 transition duration-300 text-white  px-4 py-3 rounded-full hover:shadow-3xl'

                      onClick={submitQuery}
                    >
                      Generate
                    </button>

                  </div>
                </div>
                <br /><hr /><br />
                {showLoading ? (
                  <div id='load' className='flex items-center justify-center m-10'>
                    <div className='animate-spin h-10 w-10 border-l-2 border-b-2 border-primary_1 rounded-full'></div>
                    <span className='ml-4 text-primary_1'>{LoadingText}</span>
                  </div>
                ) : (
                  isResponse ? (
                    <>
                      <div className='grid grid-cols-2 gap-5 '>

                        <div className=' col-span-2 sm:col-span-1'>

                          <p className='p-4 font-bold text-primary_1 text-2xl'>Generated Code</p>
                          <div className='max-h-96 overflow-auto p-4 bg-zinc-100 rounded-2xl'>
                            <ReactMarkdown className=''>{SimplifiedCode}</ReactMarkdown>
                          </div>
                          <button
                            className='mt-4 ml-3 flex justify-center items-center gap-2 bg-orange-100 transition duration-300 text-primary_1  px-4 py-2 rounded-full hover:bg-primary_1 hover:text-white hover:shadow-3xl'
                            onClick={copyToClipboardCode}
                          >
                            <IoCopy />
                            {isCodeCopied ? (
                              'Copied'
                            ) : ('Copy')}
                          </button>
                        </div>
                        <div className=' col-span-2 sm:col-span-1'>

                          <p className='p-4 font-bold text-primary_1 text-2xl'>Code Explanation</p>
                          <div className='max-h-96 overflow-auto p-4 bg-zinc-100 rounded-2xl'>
                            <ReactMarkdown className=''>{CodeExplanation}</ReactMarkdown>
                          </div>
                          <button
                            className='mt-4 ml-3 flex justify-center items-center gap-2 bg-orange-100 transition duration-300 text-primary_1  px-4 py-2 rounded-full hover:bg-primary_1 hover:text-white hover:shadow-3xl'
                            onClick={copyToClipboardExplanation}
                          >
                            <IoCopy />
                            {isExplanationCopied ? (
                              'Copied'
                            ) : ('Copy')}
                          </button>
                        </div>
                      </div>
                      <br />
                      <div className=''>

                        <p className='p-4 font-bold text-primary_1 text-2xl'>Interview Questions Answers</p>
                        <div className='max-h-96 overflow-auto p-4 bg-zinc-100 rounded-2xl'>
                          <ReactMarkdown className=''>{QuestionAnswers}</ReactMarkdown>
                        </div>
                        <button
                          className='mt-4 ml-3 flex justify-center items-center gap-2 bg-orange-100 transition duration-300 text-primary_1  px-4 py-2 rounded-full hover:bg-primary_1 hover:text-white hover:shadow-3xl'
                          onClick={copyToClipboardQuestions}
                        >
                          <IoCopy />
                          {isQuestionsCopied ? (
                            'Copied'
                          ) : ('Copy')}
                        </button>
                      </div>

                    </>
                  ) : (
                    isError ? (<div className='text-center flex justify-center items-center gap-4 text-primary_1'><MdError />{errorMessage}</div>) : ''
                  )
                )}

              </main>
            </div>
            <br /><br />
            <footer className='fixed bg-primary_1  text-white bottom-0 w-full p-4 text-center'>
              <p className='text-sm'> Developed by <a href="/" target='_blank' className='decoration-slate-300'>Raj Markana</a> </p>
            </footer>
          </div>
        )}
    </>
  );
};

export default App;
