import NewsLetterSignup from '../components/NewsLetterSignup';
import PageContent from '../components/PageContent';

function NewsLetterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsLetterSignup />
    </PageContent>
  );
}

export default NewsLetterPage;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log(email);
  return { message: 'Signup successful!' };
};
