const Footer = () => {
  return (
    <div className="w-full flex flex-col gap-4 text-black items-center justify-center px-20 py-2">
      Created by Mayank Mittal
      <div className="gap-2 flex ">
        <a
          href="https://github.com/MayankMittal02"
          target="_blank"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/mayank02/"
          target="_blank"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Footer;
