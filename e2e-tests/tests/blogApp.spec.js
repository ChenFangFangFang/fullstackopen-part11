const { test, expect } = require('@playwright/test')
const { resetDatabase, login, createBlog } = require('./helper')

const describe = test.describe
const beforeEach = test.beforeEach

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('login form is shown', async ({ page }) => {
    // await page.getByRole('button', { name: 'Login' }).click()
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('user')
    // await textboxes[1].fill('123456')
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.waitForSelector('[data-testid="username"] input')
      await page.locator('[data-testid="username"] input').fill('user')
      await page.locator('[data-testid="password"] input').fill('123456')
      await page.getByRole('button', { name: 'Login' }).click()

      // Wait for navigation and state update
      await page.waitForTimeout(1000)
      await expect(page.getByText('user logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('[data-testid="username"] input').fill('mluukkai')
      await page.locator('[data-testid="password"] input').fill('wrong')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'user', '123456')
    })
    test('a new blog can be added', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.waitForSelector('[data-testid="title"] input')
      await page.locator('[data-testid="title"] input').fill('testing blog')
      await page.locator('[data-testid="url"] input').fill('URL of testing blog')
      await page.locator('[data-testid="author"] input').fill('author of testing blog')
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.locator('.MuiListItemText-primary').filter({ hasText: 'testing blog' })).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Testing with Playwright', 'Ted Tester', 'http//:example.com')
      })



    })
    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'blog1', 'Ted Tester', 'http//:example.com/1')
        await createBlog(page, 'blog2', 'Ted Tester', 'http//:example.com/2')
        await createBlog(page, 'blog3', 'Ted Tester', 'http//:example.com/3')
      })

    })

  })
})
