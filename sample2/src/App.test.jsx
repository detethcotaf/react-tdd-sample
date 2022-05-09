import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from './App'
import { isTypedArray } from 'util/types'

/* 
前準備 
*/
afterEach(cleanup)

/*
テスト内容
*/

//要件
describe('test1', () => {
    test('Appのsnapshotを生成する', () => {
        const { asFlagment } = render(<App />)

        expect(asFlagment(<App />)).toMatchSnapshot()s


    })
})


