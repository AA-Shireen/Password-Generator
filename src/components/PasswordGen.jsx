import React, { useState, useCallback, useEffect, useRef } from 'react'

function PasswordGen() {

    // useState hooks:
    const [len, setLen] = useState(8);
    const [num, setNum] = useState(false);
    const [chars, setChars] = useState(false);
    const [pass, setPass] = useState("");

    // useRef hook:
    const passRef = useRef(null);

    // useCallback hooks:

    // function for generating password:
    const passwordGenerator = useCallback(
        () => {
            let genPass = "";
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            if (num) str += "0123456789";
            if (chars) str += "!@#$%^&*-_+[]{}~`";
            for (let i = 1; i <= len; i++) {
                let randNum = Math.floor(Math.random() * str.length + 1);
                genPass += str.charAt(randNum)
            };
            setPass(genPass);
        },
        [len, num, chars, setPass]
    );

    // function for coping the generated password to clipboard:
    const copyPassword = useCallback(
        () => {
            passRef.current?.select();
            window.navigator.clipboard.writeText(pass);
        }, [pass]
    )


    // useEffect hook:
    useEffect(() => {
        passwordGenerator();
    }, [len, num, chars, passwordGenerator])

    return (
        <>
            <div className='h-screen w-screen bg-slate-900 text-sky-50 py-8'>
                <h1 className='text-center text-4xl'>Password Generator</h1>
                <div className='w-full max-w-md mx-auto shadow-md rounded-md px-4 my-8 text-orange-500 bg-slate-700 text-xl py-4'>
                    <div className='flex shadow rounded overflow-hidden mb-4'>
                        <input type="text"
                            value={pass}
                            className='outline-none w-full py-1 px-3'
                            placeholder='password'
                            readOnly
                            ref={passRef}
                        />
                        <button
                            onClick={copyPassword}
                            className='bg-sky-500 px-2 py-0.5 text-white transition duration-200 ease-in hover:bg-sky-600'>Copy</button>
                    </div>
                    <div className='flex text-base gap-x-2'>
                        <div className='flex flex-col gap-x-1'>
                            <div className='flex items-center gap-x-1'>
                                <input type="range"
                                    min={8}
                                    max={32}
                                    value={len}
                                    id='range'
                                    className='cursor-pointer'
                                    onChange={(e) => { setLen(e.target.value) }}
                                />
                                <label htmlFor="range">Lenght: {len}</label>
                            </div>
                            <div className='flex flex-col gap-x-1 my-2'>
                                <div className='flex items-center'>
                                    <input type="checkbox" id="numbers" className='mx-2'
                                        defaultChecked={num}
                                        onChange={() => { setNum((prev) => !prev) }} />
                                    <label htmlFor="numbers">Numbers</label>
                                </div>
                                <div className='flex my-2'>
                                    <input type="checkbox" id="chars" className='mx-2'
                                        defaultChecked={chars}
                                        onChange={() => { setChars((prev) => !prev) }} />
                                    <label htmlFor="chars">Characters</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordGen