import React from 'react';
import { findByText, fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import Recipes from './Recipes'

import { rest } from 'msw';
import { setupServer } from 'msw/node';

/* 
前準備 
*/
const allRecipes = [
    { id: 1, title: 'Burger' },
    { id: 2, title: 'French toast' },
    { id: 3, title: 'Salmon' }
];

// Mock Serverの構築
const server = setupServer(
    rest.get('/api/recipes', (req, res, ctx) => {
        if (req.url.searchParams.get('ingredient') === 'fish') {
            return res(ctx.json({ recipes: allRecipes.filter(recipe => recipe.id === 3) }));
        }
        return res(ctx.status(200), ctx.json({ recipes: allRecipes }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); // 毎テスト後にサーバの状態をリセットする
afterAll(() => server.close());

// let roleHeading, roleTextbox, findButton, placeholderText, listItems, queryItems
// beforeEach(async () => {
//     if (this.currentTest.title == '検索に何も引っ掛からなかったとき') return
//     // render結果の必要な関数のみ取り出し
//     const { getByRole, getAllByPlaceholderText, findAllByRole, queryByRole } = render(<Recipes />)
//     roleHeading = getByRole('heading')
//     roleTextbox = getByRole('textbox')
//     findButton = getByRole('button', { name: 'Find' })
//     placeholderText = getAllByPlaceholderText
//     //listItems = await findAllByRole('listitem')
//     queryItems = await queryByRole('listitem')
// })


/*
テスト内容
*/

//要件
describe('レシピ画面が表示される', () => {
    // 準備
    const { getByRole } = render(<Recipes />);
    const roleHeading = getByRole('heading')
    const roleTextbox = getByRole('textbox')
    const findButton = getByRole('button', { name: 'Find' })

    // 仕様
    it('タイトルにRecipe Finderと表示する', () => {
        expect(roleHeading).toHaveTextContent('Recipe Finder');
    })

    it('テキストボックスが存在する', () => {
        expect(roleTextbox).toBeTruthly;
    })

    it('Findというボタンが存在する', () => {
        expect(findButton).toHaveTextContent('Find');
    })
})

//要件
describe('レシピが表示される', () => {
    // 準備
    let listItems, roleTextbox, findButton
    beforeEach(async () => {
        const { getByRole, findAllByRole } = render(<Recipes />)
        listItems = await findAllByRole('listitem')
        //searchTextField = getByLabelText("ingredient").querySelector('input');
        roleTextbox = getByRole('textbox')
        findButton = getByRole('button', { name: 'Find' })
    })

    // 仕様
    it('全レシピを取得し表示する', () => {
        expect(listItems).toHaveLength(3);
        expect(listItems[0]).toHaveTextContent('Burger')
        expect(listItems[1]).toHaveTextContent('French toast')
        expect(listItems[2]).toHaveTextContent('Salmon')
    })

    it('フィルタリングされたレシピを表示する', () => {
        fireEvent.change(roleTextbox, { target: { value: 'fish' } })
        fireEvent.click(findButton)

        expect(listItems).toHaveLength(1);
        expect(listItems[0]).toHaveTextContent('Salmon')
    })
})


// 要件
describe('レシピ画面が操作できる', () => {
    // 仕様
    // it('テキストボックスに文字を入力できる', () => {
    //     const textToType = 'potato'
    //     userEvent.type(roleTextbox, textToType)
    //     expect(roleTextbox).toHaveAttribute('value', textToType)
    // })

    it.todo('Findボタンを押せる')
})


// // 要件
// describe('エラーメッセージが表示される', () => {
//     // 仕様
//     it('検索に何も引っ掛からなかったとき', async () => {
//         server.use(
//             rest.get('/api/recipes', (req, res, ctx) => {
//                 return res(
//                     ctx.status(500),
//                     ctx.json({ message: 'Internal server error' }),
//                 );
//             })
//         );
//         render(<Recipes />);

//         expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

//         expect(await screen.findByText(
//             'Failed to fetch recipes, error message: Internal Server Error'
//         )).toBeInTheDocument();
//     })
// })

