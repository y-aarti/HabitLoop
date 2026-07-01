import Header from '../components/Header';
import Main from '../components/Main';

function RootLayout() {
  return (
    <div className="app-shell">
      <Header />
      <Main />
    </div>
  );
}

export default RootLayout;
