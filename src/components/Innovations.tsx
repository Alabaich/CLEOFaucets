import React from "react";

const Innovation = () => {
  const items = [
    {
      title: "Smart Water Control",
      description:
        "A cutting-edge solution for managing water resources efficiently.",
      svg: (
        <svg
          width="100%"
          height="auto"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_685_1941)">
            <path
              d="M682.609 436.678V206.522C682.609 188.512 668.009 173.913 650 173.913H425.909C406.933 154.025 382.944 140.395 356.522 134.214V65.2172H389.131C407.14 65.2172 421.74 50.6172 421.74 32.6078C421.74 14.5984 407.139 0 389.129 0H258.695C240.686 0 226.086 14.6 226.086 32.6094C226.086 50.6188 240.686 65.2188 258.695 65.2188H291.304V134.217C264.883 140.397 240.894 154.027 221.917 173.916H128.261C110.251 173.916 95.6514 188.516 95.6514 206.525V336.959C95.6514 354.969 110.251 369.569 128.261 369.569H221.915C248.459 397.389 284.792 413.047 323.914 413.047C363.036 413.047 399.365 397.388 425.909 369.569H486.958V436.681C474.301 441.161 465.219 453.203 465.219 467.394C465.219 485.403 479.819 500.003 497.828 500.003H519.567H650H671.739C689.748 500.003 704.348 485.403 704.348 467.394C704.348 453.2 695.265 441.161 682.609 436.678ZM617.39 434.783H552.173V336.956C552.173 318.947 537.573 304.347 519.564 304.347H410.869C400.612 304.347 390.953 309.173 384.795 317.373C370.261 336.728 348.069 347.825 323.912 347.825C299.756 347.825 277.564 336.727 263.03 317.373C256.87 309.173 247.212 304.347 236.956 304.347H160.869V239.13H236.956C247.212 239.13 256.869 234.303 263.03 226.106C277.564 206.75 299.756 195.652 323.912 195.652C348.069 195.652 370.261 206.75 384.795 226.106C390.956 234.305 400.612 239.13 410.869 239.13H617.39V434.783Z"
              fill="white"
            />
            <path
              d="M608.372 575.312C602.22 568.864 593.695 565.217 584.783 565.217C575.87 565.217 567.345 568.865 561.194 575.312C543.778 593.557 486.956 656.631 486.956 702.173C486.956 756.117 530.839 800 584.783 800C638.726 800 682.609 756.117 682.609 702.173C682.609 656.632 625.787 593.559 608.372 575.312ZM584.783 734.782C566.8 734.782 552.173 720.156 552.173 702.232C552.547 693.27 566.358 670.75 584.762 647.553C603.04 670.657 617.023 693.401 617.39 702.175C617.39 720.156 602.765 734.782 584.783 734.782Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_685_1941">
              <rect width="800" height="800" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Eco-Friendly Technology",
      description:
        "Sustainable and environmentally friendly technology for the future.",
      svg: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_687_1969)">
            <path
              d="M778.291 403.431C775.891 402.961 732.845 394.632 675.083 390.374C675.363 385.067 675.511 379.724 675.511 374.346C675.511 208.187 540.33 73.0059 374.171 73.0059C208.01 73.0059 72.8267 208.187 72.8267 374.346C72.8267 409.379 78.8579 443.022 89.8961 474.325C51.3681 477.568 23.3651 482.985 21.7093 483.311L0 487.568L9.45537 507.568C12.3703 513.735 81.8577 659.105 168.894 703.08C200.303 718.947 229.68 726.993 256.211 726.997C256.217 726.997 256.219 726.997 256.223 726.997C295.735 726.997 328.092 709.148 348.451 676.456C375.162 708.371 412.754 725.566 457.242 725.566C492.682 725.566 532.082 714.741 574.346 693.389C692.008 633.942 786.576 436.085 790.545 427.69L800 407.69L778.291 403.431ZM622.44 276.36C611.082 267.061 598.001 258.358 583.275 250.382C565.049 240.511 544.885 232.103 523.304 225.217C516.418 203.632 508.01 183.468 498.135 165.239C490.16 150.514 481.458 137.433 472.157 126.075C540.64 153.202 595.317 207.88 622.44 276.36ZM638.854 357.127H544.993C544.004 325.467 540.278 294.721 534.048 265.772C589.979 287.628 629.357 320.349 638.854 357.127ZM391.39 109.661C428.17 119.16 460.892 158.54 482.749 214.471C453.799 208.241 423.054 204.517 391.39 203.526V109.661ZM391.39 237.976C428.416 239.251 463.662 244.598 495.386 253.132C503.919 284.857 509.266 320.101 510.543 357.125H391.39V237.976ZM391.39 391.566H510.543C510.489 393.087 510.432 394.609 510.367 396.124C481.648 401.453 456.828 409.351 436.135 419.805C419.612 428.152 404.694 437.06 391.39 446.502V391.566ZM356.95 109.661V203.526C325.288 204.517 294.541 208.241 265.591 214.471C287.448 158.54 320.172 119.16 356.95 109.661ZM356.95 237.976V357.127H237.797C239.072 320.103 244.419 284.857 252.954 253.132C284.677 244.598 319.925 239.253 356.95 237.976ZM276.181 126.079C266.88 137.437 258.178 150.518 250.203 165.243C240.329 183.47 231.922 203.636 225.036 225.219C203.451 232.107 183.289 240.513 165.059 250.386C150.335 258.362 137.254 267.063 125.896 276.362C153.023 207.878 207.698 153.202 276.181 126.079ZM214.292 265.77C208.062 294.721 204.335 325.465 203.347 357.127H109.484C118.981 320.349 158.361 287.628 214.292 265.77ZM203.347 391.566C204.27 421.098 207.566 449.835 213.061 477.063C207.162 476.078 201.055 475.229 194.74 474.528C149.269 453.092 117.83 423.895 109.484 391.566H203.347ZM310.673 669.563C299.252 682.166 282.019 692.555 256.223 692.555H256.215C235.127 692.553 210.973 685.752 184.424 672.339C125.823 642.73 72.9569 553.917 51.1549 513.396C72.8701 510.29 107.629 506.362 144.522 506.362C193.637 506.362 231.869 513.096 258.159 526.378C281.847 538.344 299.975 551.738 312.41 566.171C309.937 591.277 314.725 616.979 326.716 642.175L152.618 560.659L310.673 669.563ZM288.058 503.422C283.456 500.759 278.678 498.16 273.687 495.638C266.613 492.064 258.871 488.912 250.543 486.141C243.414 456.914 238.95 424.966 237.797 391.564H356.95V475.801C346.717 486.407 338.179 497.54 331.348 509.174C316.509 507.89 302.039 505.954 288.058 503.422ZM558.816 662.647C521.413 681.544 487.237 691.124 457.242 691.124C417.224 691.124 391.311 674.033 374.706 654.121L613.812 500.962L359.383 630.671C359.332 630.569 359.274 630.464 359.223 630.361C325.177 562.962 358.872 497.422 451.665 450.546C488.707 431.832 542.232 422.343 610.755 422.343C667.195 422.343 720.179 429.012 749.044 433.421C721.961 484.947 645.181 619.013 558.816 662.647Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_687_1969">
              <rect width="800" height="800" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Durable Finishes",
      description: "Built to resist wear and maintain elegance for years.",
      svg: (
<svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M300 400L366.666 466.667L500 333.333M666.666 400C666.666 548.703 484.666 656.457 421.38 689.433C414.536 693 411.113 694.783 406.366 695.707C402.666 696.427 397.333 696.427 393.633 695.707C388.886 694.783 385.463 693 378.62 689.433C315.332 656.457 133.333 548.703 133.333 400V273.92C133.333 247.269 133.333 233.944 137.692 222.49C141.542 212.371 147.799 203.342 155.922 196.184C165.116 188.081 177.593 183.402 202.546 174.045L381.273 107.022C388.203 104.424 391.666 103.124 395.233 102.609C398.393 102.152 401.606 102.152 404.766 102.609C408.333 103.124 411.796 104.424 418.726 107.022L597.453 174.045C622.406 183.402 634.883 188.081 644.076 196.184C652.2 203.342 658.456 212.371 662.306 222.49C666.666 233.944 666.666 247.269 666.666 273.92V400Z" stroke="white" strokeWidth="60" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      ),
    },
    {
      title: "Comprehensive Solutions",
      description: "From faucets to sinks, bathtubs, and more.",
      svg: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_687_1963)">
            <mask
              id="path-1-outside-1_687_1963"
              maskUnits="userSpaceOnUse"
              x="5.94043"
              y="-4"
              width="789"
              height="805"
              fill="black"
            >
              <rect fill="white" x="5.94043" y="-4" width="789" height="805" />
              <path d="M777.639 49.6891H766.873V12.4219C766.873 5.56094 761.312 0 754.451 0H658.386C651.523 0 645.964 5.5625 645.964 12.4219V49.6891H631.886C625.023 49.6891 619.464 55.2516 619.464 62.1109V101.863C619.464 108.723 625.025 114.284 631.886 114.284H645.964V151.552C645.964 158.412 651.525 163.973 658.386 163.973C665.248 163.973 670.808 158.411 670.808 151.552V114.286H742.029V293.995C742.029 369.342 680.73 430.641 605.384 430.641H511.803V356.106H608.697C642.945 356.106 670.809 328.244 670.809 293.994V217.803C670.809 210.942 665.248 205.381 658.387 205.381C651.525 205.381 645.965 210.944 645.965 217.803V293.994C645.965 314.544 629.247 331.261 608.698 331.261H511.804V313.87C511.804 307.009 506.244 301.448 499.383 301.448H459.631C452.769 301.448 447.209 307.011 447.209 313.87V331.261H419.047V243.477H432.376C437.8 262.57 455.381 276.603 476.189 276.603C501.303 276.603 521.737 256.17 521.737 231.055C521.737 205.939 501.303 185.506 476.189 185.506C455.381 185.506 437.798 199.539 432.376 218.633H380.872C375.448 199.539 357.867 185.506 337.059 185.506C311.945 185.506 291.511 205.939 291.511 231.055C291.511 256.17 311.945 276.603 337.059 276.603C357.867 276.603 375.45 262.57 380.872 243.477H394.201V331.261H366.044V313.87C366.044 307.009 360.483 301.448 353.622 301.448H313.87C307.008 301.448 301.448 307.011 301.448 313.87V331.261H197.928C108.881 331.261 36.4373 403.705 36.4373 492.752V549.066C36.4373 555.927 41.9982 561.487 48.8592 561.487C55.7217 561.487 61.2811 555.925 61.2811 549.066V492.752C61.2811 417.405 122.581 356.106 197.926 356.106H301.447V430.641H194.614C160.364 430.641 132.501 458.503 132.501 492.753V682.402H61.2842V615.32C61.2842 608.459 55.7232 602.898 48.8623 602.898C41.9998 602.898 36.4404 608.461 36.4404 615.32V682.402H22.3623C15.4998 682.402 9.94043 687.964 9.94043 694.823V734.575C9.94043 741.436 15.5014 746.997 22.3623 746.997H36.4404V784.264C36.4404 791.125 42.0014 796.686 48.8623 796.686H144.928C151.79 796.686 157.35 791.123 157.35 784.264V746.997H168.115C174.978 746.997 180.537 741.434 180.537 734.575V694.823C180.537 687.963 174.976 682.402 168.115 682.402H157.35V492.753C157.35 472.203 174.069 455.486 194.617 455.486H301.45V472.877C301.45 479.737 307.011 485.298 313.872 485.298H353.623C360.486 485.298 366.045 479.736 366.045 472.877V455.486H447.204V472.877C447.204 479.737 452.765 485.298 459.626 485.298H499.378C506.24 485.298 511.8 479.736 511.8 472.877V455.486H605.381C694.428 455.486 766.872 383.042 766.872 293.995V114.286H777.637C784.5 114.286 790.059 108.723 790.059 101.864V62.1125C790.062 55.2516 784.501 49.6891 777.639 49.6891ZM476.19 210.352C487.608 210.352 496.895 219.639 496.895 231.056C496.895 242.473 487.608 251.759 476.19 251.759C464.773 251.759 455.487 242.472 455.487 231.056C455.487 219.641 464.773 210.352 476.19 210.352ZM337.059 251.759C325.642 251.759 316.354 242.472 316.354 231.056C316.354 219.641 325.642 210.352 337.059 210.352C348.476 210.352 357.762 219.639 357.762 231.056C357.762 242.473 348.476 251.759 337.059 251.759ZM132.504 771.842H61.2842V746.997H132.506L132.504 771.842ZM155.694 722.153H34.7826V707.247H155.694V722.153ZM341.201 460.456H326.295V326.295H341.201V460.456ZM447.204 430.642H366.045V356.108H447.204V430.642ZM486.956 460.456H472.05V326.295H486.956V460.456ZM670.808 24.8453H742.029V49.6906H670.808V24.8453ZM765.217 89.4406H644.306V74.5344H765.217V89.4406Z" />
            </mask>
            <path
              d="M777.639 49.6891H766.873V12.4219C766.873 5.56094 761.312 0 754.451 0H658.386C651.523 0 645.964 5.5625 645.964 12.4219V49.6891H631.886C625.023 49.6891 619.464 55.2516 619.464 62.1109V101.863C619.464 108.723 625.025 114.284 631.886 114.284H645.964V151.552C645.964 158.412 651.525 163.973 658.386 163.973C665.248 163.973 670.808 158.411 670.808 151.552V114.286H742.029V293.995C742.029 369.342 680.73 430.641 605.384 430.641H511.803V356.106H608.697C642.945 356.106 670.809 328.244 670.809 293.994V217.803C670.809 210.942 665.248 205.381 658.387 205.381C651.525 205.381 645.965 210.944 645.965 217.803V293.994C645.965 314.544 629.247 331.261 608.698 331.261H511.804V313.87C511.804 307.009 506.244 301.448 499.383 301.448H459.631C452.769 301.448 447.209 307.011 447.209 313.87V331.261H419.047V243.477H432.376C437.8 262.57 455.381 276.603 476.189 276.603C501.303 276.603 521.737 256.17 521.737 231.055C521.737 205.939 501.303 185.506 476.189 185.506C455.381 185.506 437.798 199.539 432.376 218.633H380.872C375.448 199.539 357.867 185.506 337.059 185.506C311.945 185.506 291.511 205.939 291.511 231.055C291.511 256.17 311.945 276.603 337.059 276.603C357.867 276.603 375.45 262.57 380.872 243.477H394.201V331.261H366.044V313.87C366.044 307.009 360.483 301.448 353.622 301.448H313.87C307.008 301.448 301.448 307.011 301.448 313.87V331.261H197.928C108.881 331.261 36.4373 403.705 36.4373 492.752V549.066C36.4373 555.927 41.9982 561.487 48.8592 561.487C55.7217 561.487 61.2811 555.925 61.2811 549.066V492.752C61.2811 417.405 122.581 356.106 197.926 356.106H301.447V430.641H194.614C160.364 430.641 132.501 458.503 132.501 492.753V682.402H61.2842V615.32C61.2842 608.459 55.7232 602.898 48.8623 602.898C41.9998 602.898 36.4404 608.461 36.4404 615.32V682.402H22.3623C15.4998 682.402 9.94043 687.964 9.94043 694.823V734.575C9.94043 741.436 15.5014 746.997 22.3623 746.997H36.4404V784.264C36.4404 791.125 42.0014 796.686 48.8623 796.686H144.928C151.79 796.686 157.35 791.123 157.35 784.264V746.997H168.115C174.978 746.997 180.537 741.434 180.537 734.575V694.823C180.537 687.963 174.976 682.402 168.115 682.402H157.35V492.753C157.35 472.203 174.069 455.486 194.617 455.486H301.45V472.877C301.45 479.737 307.011 485.298 313.872 485.298H353.623C360.486 485.298 366.045 479.736 366.045 472.877V455.486H447.204V472.877C447.204 479.737 452.765 485.298 459.626 485.298H499.378C506.24 485.298 511.8 479.736 511.8 472.877V455.486H605.381C694.428 455.486 766.872 383.042 766.872 293.995V114.286H777.637C784.5 114.286 790.059 108.723 790.059 101.864V62.1125C790.062 55.2516 784.501 49.6891 777.639 49.6891ZM476.19 210.352C487.608 210.352 496.895 219.639 496.895 231.056C496.895 242.473 487.608 251.759 476.19 251.759C464.773 251.759 455.487 242.472 455.487 231.056C455.487 219.641 464.773 210.352 476.19 210.352ZM337.059 251.759C325.642 251.759 316.354 242.472 316.354 231.056C316.354 219.641 325.642 210.352 337.059 210.352C348.476 210.352 357.762 219.639 357.762 231.056C357.762 242.473 348.476 251.759 337.059 251.759ZM132.504 771.842H61.2842V746.997H132.506L132.504 771.842ZM155.694 722.153H34.7826V707.247H155.694V722.153ZM341.201 460.456H326.295V326.295H341.201V460.456ZM447.204 430.642H366.045V356.108H447.204V430.642ZM486.956 460.456H472.05V326.295H486.956V460.456ZM670.808 24.8453H742.029V49.6906H670.808V24.8453ZM765.217 89.4406H644.306V74.5344H765.217V89.4406Z"
              fill="white"
            />
            <path
              d="M777.639 49.6891H766.873V12.4219C766.873 5.56094 761.312 0 754.451 0H658.386C651.523 0 645.964 5.5625 645.964 12.4219V49.6891H631.886C625.023 49.6891 619.464 55.2516 619.464 62.1109V101.863C619.464 108.723 625.025 114.284 631.886 114.284H645.964V151.552C645.964 158.412 651.525 163.973 658.386 163.973C665.248 163.973 670.808 158.411 670.808 151.552V114.286H742.029V293.995C742.029 369.342 680.73 430.641 605.384 430.641H511.803V356.106H608.697C642.945 356.106 670.809 328.244 670.809 293.994V217.803C670.809 210.942 665.248 205.381 658.387 205.381C651.525 205.381 645.965 210.944 645.965 217.803V293.994C645.965 314.544 629.247 331.261 608.698 331.261H511.804V313.87C511.804 307.009 506.244 301.448 499.383 301.448H459.631C452.769 301.448 447.209 307.011 447.209 313.87V331.261H419.047V243.477H432.376C437.8 262.57 455.381 276.603 476.189 276.603C501.303 276.603 521.737 256.17 521.737 231.055C521.737 205.939 501.303 185.506 476.189 185.506C455.381 185.506 437.798 199.539 432.376 218.633H380.872C375.448 199.539 357.867 185.506 337.059 185.506C311.945 185.506 291.511 205.939 291.511 231.055C291.511 256.17 311.945 276.603 337.059 276.603C357.867 276.603 375.45 262.57 380.872 243.477H394.201V331.261H366.044V313.87C366.044 307.009 360.483 301.448 353.622 301.448H313.87C307.008 301.448 301.448 307.011 301.448 313.87V331.261H197.928C108.881 331.261 36.4373 403.705 36.4373 492.752V549.066C36.4373 555.927 41.9982 561.487 48.8592 561.487C55.7217 561.487 61.2811 555.925 61.2811 549.066V492.752C61.2811 417.405 122.581 356.106 197.926 356.106H301.447V430.641H194.614C160.364 430.641 132.501 458.503 132.501 492.753V682.402H61.2842V615.32C61.2842 608.459 55.7232 602.898 48.8623 602.898C41.9998 602.898 36.4404 608.461 36.4404 615.32V682.402H22.3623C15.4998 682.402 9.94043 687.964 9.94043 694.823V734.575C9.94043 741.436 15.5014 746.997 22.3623 746.997H36.4404V784.264C36.4404 791.125 42.0014 796.686 48.8623 796.686H144.928C151.79 796.686 157.35 791.123 157.35 784.264V746.997H168.115C174.978 746.997 180.537 741.434 180.537 734.575V694.823C180.537 687.963 174.976 682.402 168.115 682.402H157.35V492.753C157.35 472.203 174.069 455.486 194.617 455.486H301.45V472.877C301.45 479.737 307.011 485.298 313.872 485.298H353.623C360.486 485.298 366.045 479.736 366.045 472.877V455.486H447.204V472.877C447.204 479.737 452.765 485.298 459.626 485.298H499.378C506.24 485.298 511.8 479.736 511.8 472.877V455.486H605.381C694.428 455.486 766.872 383.042 766.872 293.995V114.286H777.637C784.5 114.286 790.059 108.723 790.059 101.864V62.1125C790.062 55.2516 784.501 49.6891 777.639 49.6891ZM476.19 210.352C487.608 210.352 496.895 219.639 496.895 231.056C496.895 242.473 487.608 251.759 476.19 251.759C464.773 251.759 455.487 242.472 455.487 231.056C455.487 219.641 464.773 210.352 476.19 210.352ZM337.059 251.759C325.642 251.759 316.354 242.472 316.354 231.056C316.354 219.641 325.642 210.352 337.059 210.352C348.476 210.352 357.762 219.639 357.762 231.056C357.762 242.473 348.476 251.759 337.059 251.759ZM132.504 771.842H61.2842V746.997H132.506L132.504 771.842ZM155.694 722.153H34.7826V707.247H155.694V722.153ZM341.201 460.456H326.295V326.295H341.201V460.456ZM447.204 430.642H366.045V356.108H447.204V430.642ZM486.956 460.456H472.05V326.295H486.956V460.456ZM670.808 24.8453H742.029V49.6906H670.808V24.8453ZM765.217 89.4406H644.306V74.5344H765.217V89.4406Z"
              stroke="white"
              strokeWidth="8"
              mask="url(#path-1-outside-1_687_1963)"
            />
            <path
              d="M471.306 582.538C467.833 576.619 460.222 574.636 454.306 578.108C448.387 581.58 446.406 589.191 449.876 595.108C485.022 655.014 490.269 681.222 490.269 691.511C490.269 737.633 452.747 775.155 406.625 775.155C360.503 775.155 322.981 737.633 322.981 691.511C322.981 655.786 376.417 571.171 406.597 527.561C411.008 533.95 416.584 542.169 422.74 551.553C426.503 557.291 434.206 558.891 439.94 555.129C445.678 551.368 447.278 543.664 443.515 537.927C428.504 515.039 417.154 499.366 416.679 498.71C411.801 491.985 401.447 491.985 396.567 498.71C386.494 512.602 298.136 636.027 298.136 691.511C298.136 751.333 346.803 800 406.625 800C466.447 800 515.114 751.333 515.114 691.511C515.114 668.43 500.784 632.783 471.306 582.538Z"
              fill="white"
            />
            <path
              d="M437.02 602.654C433.547 596.735 425.937 594.754 420.02 598.224C414.102 601.696 412.12 609.307 415.591 615.224C449.283 672.657 450.484 690.913 450.517 691.51C450.517 715.711 430.827 735.402 406.625 735.402C399.762 735.402 394.203 740.964 394.203 747.824C394.203 754.683 399.764 760.246 406.625 760.246C444.527 760.246 475.363 729.41 475.363 691.508C475.363 685.997 472.598 663.299 437.02 602.654Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_687_1963">
              <rect width="800" height="800" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Innovative Solutions</h2>
      </div>

      <div className="flex flex-wrap justify-center mt-8 mb-4 md:mt-0 md:mb-0 gap-4 md:gap-12">
        {items.map((item, index) => (
          <div
            key={index}
            className="innovation-item flex flex-col items-center justify-center w-[300px] md:h-[300px] md:p-4 rounded-lg relative group"
          >
            {item.svg && (
              <div
                className="innovation-svg"
                style={{ width: "100%", height: "100px" }}
              >
                {item.svg}
              </div>
            )}
            <div className="mt-4 text-center font-bold text-white">
              {item.title}
            </div>
            <div className="mt-2 text-center text-sm text-gray-300">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Innovation;
