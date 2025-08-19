
const resetDatabase = async (request) => {
  await request.post('/api/testing/reset')
  await request.post('/api/users', {
    data: {
      name: 'user',
      username: 'user',
      password: '123456'
    }
  })
  await request.post('/api/users', {
    data: {
      name: 'testing user',
      username: 'testing user',
      password: 'testing'
    }
  })
}

const login = async (page, username, password) => {
  await page.locator('[data-testid="username"] input').fill(username)
  await page.locator('[data-testid="password"] input').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}
const createBlog = async (page, title, author, url) => {
  // Wait for the create blog button and click it
  const createButton = await page.getByRole('button', { name: 'create new blog' })
  await createButton.waitFor()
  await createButton.click()

  // Wait for form fields and fill them
  await page.waitForSelector('[data-testid="title"] input')
  await page.locator('[data-testid="title"] input').fill(title)
  await page.locator('[data-testid="author"] input').fill(author)
  await page.locator('[data-testid="url"] input').fill(url)

  // Submit the form
  await page.getByRole('button', { name: 'Create' }).click()

  // Wait for the blog to appear in the list and be visible
  await page.waitForSelector('.MuiListItemText-primary')
  const blogTitle = page.locator('.MuiListItemText-primary').filter({ hasText: title })
  await blogTitle.waitFor({ state: 'visible', timeout: 10000 })
  await page.waitForTimeout(500) // Add a small delay to ensure state updates
}
const likeTimes = async (page, button, n) => {
  for (let i = 0; i < n; i++) {
    await button.click()
    await page.getByText(`Likes: ${i + 1}`).waitFor()
  }
}

module.exports = { resetDatabase, login, createBlog, likeTimes }
