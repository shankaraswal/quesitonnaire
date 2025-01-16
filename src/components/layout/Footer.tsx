const Footer = () => {
  return (
    <footer className="h-[100px] w-full bg-gray-900 py-4 text-white">
      <div className="container mx-auto h-full content-center text-center">
        <p>
          {' '}
          &copy; {new Date().getFullYear()} STHIRAH INC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
