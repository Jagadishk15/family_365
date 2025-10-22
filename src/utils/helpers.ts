import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {emailRegex} from '../entities/entryObjects';
import {LayoutAnimation} from 'react-native';

export const OPEN_CAMERA = async (): Promise<any> => {
  const options: any = {
    mediaType: 'photo',
    includeExtra: true,
    saveToPhotos: true,
  };
  const result = await launchCamera(options);

  return new Promise<any>((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject(false);
    }
  });
};

export const OPEN_GALLERY = async (): Promise<any> => {
  const options: any = {
    mediaType: 'photo',
    includeExtra: true,
    saveToPhotos: true,
  };
  const result = await launchImageLibrary(options);

  return new Promise<any>((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject(false);
    }
  });
};

//animation
export class LayoutAnimations {
  static easeIn(duration?: number) {
    LayoutAnimation.configureNext({
      duration: duration ?? 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  }
}

///error handler
export const handleErrorValidate = (props: any) => {
  const keys = Object.keys(props);
  let payload: any;

  keys.forEach(key => {
    const value = props[key];

    if (key === 'areaPincode') {
      if (!value) {
        payload = {
          message: 'Please enter the pincode',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      } else if (value?.length !== 6) {
        payload = {
          message: 'Please enter a valid pincode',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'selectedParticipation') {
      if (!value) {
        payload = {
          message: 'Please select any one of participation',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'email') {
      if (!value) {
        payload = {
          message: 'Enter  email',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      } else if (!emailRegex?.test(value)) {
        payload = {
          message: 'Enter valid email',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'password') {
      if (!value) {
        payload = {
          message: 'Enter password',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      } else if (value?.length < 4) {
        payload = {
          message: 'Enter valid password',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'userName') {
      if (!value) {
        payload = {
          message: 'Enter userName',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    }
  });

  if (payload) {
    return payload;
  }
};

export const handleRegisterErrorValidate = (props: any) => {
  const keys = Object.keys(props);
  let payload: any;
  keys.forEach(key => {
    const value = props[key];
    if (key === 'fullName') {
      if (!value) {
        payload = {
          message: 'Enter full Name',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'phoneNumber') {
      if (!value) {
        payload = {
          message: 'Enter phone Number',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      } else if (value?.trim()?.length < 10) {
        payload = {
          message: 'Enter valid Phone Number',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'email') {
      if (!value) {
        payload = {
          message: 'Enter  email',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      } else if (!emailRegex?.test(value)) {
        payload = {
          message: 'Enter valid email',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'gender') {
      if (!value) {
        payload = {
          message: 'Select Gender',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'address1') {
      if (!value) {
        payload = {
          message: 'Enter Address 1',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'address2') {
      if (!value) {
        payload = {
          message: 'Enter Address 2',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'city') {
      if (!value) {
        payload = {
          message: 'Select City',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'state') {
      if (!value) {
        payload = {
          message: 'Select State',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'pinCode') {
      if (!value) {
        payload = {
          message: 'Select PinCode',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'transactionId') {
      if (!value) {
        payload = {
          message: 'Enter Transaction Id',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    }
  });

  if (payload) {
    return payload;
  }
};

const verhoeffTableD = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const verhoeffTableP = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

// The inverse table is used to find the inverse of a digit in Verhoeff's scheme.
// const verhoeffTableInv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

function validateAadhaar(aadhaar: string) {
  // 1. Must be exactly 12 digits
  if (!/^\d{12}$/.test(aadhaar)) return false;

  // 2. Apply Verhoeff checksum
  let checksum = 0;
  // Reverse the Aadhaar string because Verhoeff calculation starts from the rightmost digit
  const digits = aadhaar.split('').reverse().map(Number);

  // Accumulate through the Verhoeff 'D' and 'P' tables
  for (let i = 0; i < digits.length; i++) {
    checksum = verhoeffTableD[checksum][verhoeffTableP[i % 8][digits[i]]];
  }

  // If the final checksum is 0, the Aadhaar is valid
  return checksum === 0;
}

function validatePAN(pan: string) {
  // Regex: Must match exactly 10 characters: 5 letters, 4 digits, 1 letter (all uppercase).
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  return panRegex.test(pan);
}

export const handleIdentityValidation = (props: any) => {
  const keys = Object.keys(props);
  let payload: any;
  keys.forEach(key => {
    const value = props[key];
    if (key === 'selectedConsentText') {
      if (!value) {
        payload = {
          message: 'select any one of consent',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    } else if (key === 'aadhar') {
      // if (!value) {
      //   payload = {
      //     message: 'Enter Aadhar Details',
      //     duration: 3000,
      //     status: 'error',
      //     slideFrom: 'right',
      //   };
      // }
      if (value) {
        const validateA = validateAadhaar(value);
        if (!validateA) {
          payload = {
            message: 'Enter valid aadhar number',
            duration: 3000,
            status: 'error',
            slideFrom: 'right',
          };
        }
      }
    } else if (key === 'pan') {
      // if (!value) {
      //   payload = {
      //     message: 'Enter pan details',
      //     duration: 3000,
      //     status: 'error',
      //     slideFrom: 'right',
      //   };
      // }
      if (value) {
        const validateA = validatePAN(value);
        if (!validateA) {
          payload = {
            message: 'Enter valid PAN number',
            duration: 3000,
            status: 'error',
            slideFrom: 'right',
          };
        }
      }
    } else if (key === 'blood') {
      if (!value) {
        payload = {
          message: 'Enter blood group details',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    }
  });

  if (payload) {
    return payload;
  }
};

export const handleTransactionValidation = (props: any) => {
  const keys = Object.keys(props);
  let payload: any;
  keys.forEach(key => {
    const value = props[key];
    if (key === 'transactionId') {
      if (!value) {
        payload = {
          message: 'Enter Transaction Id',
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
      }
    }
  });

  if (payload) {
    return payload;
  }
};

export const validateBookings = (bookings: any) => {
  return bookings.map((booking: any) => {
    const isDescriptionError = booking.memberBookedDescription.trim() === '';
    const isDobError = booking.memberNameBookedDob.trim() === '';
    const isNameError = booking.memberNameBooked.trim() === '';

    return {
      ...booking,
      isDescriptionError,
      isDobError,
      isNameError,
    };
  });
};
