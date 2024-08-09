import extensions from '@/utils/data/extensions.json'
import file_types from '@/utils/data/file_types.json'

class Utils {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  isOfficeFile(filePath) {
    const officeFileExtensions = [
        "doc", "docx", "dot", "dotx", "docm", "dotm",
        "xls", "xlsx", "xlt", "xltx", "xlsm", "xltm", "xlsb",
        "ppt", "pptx", "pot", "potx", "pps", "ppsx", "pptm", "potm", "ppsm",
        "mdb", "accdb",
        "pub",
        "pst", "ost", "msg"
    ];

    const extension = filePath.split('.').pop().toLowerCase();
    return officeFileExtensions.includes(extension);
  }

  getFileType(fileName) {
    let fileNameSplitted = fileName.split('.')

    if (fileName.length > 0) {
      let extension = fileNameSplitted[fileNameSplitted.length - 1].toLowerCase()

      if (Object.prototype.hasOwnProperty.call(file_types, extension)) {
        return this.capitalizeFirstLetter(file_types[extension][0])
      }
    }

    return 'Unknown Type'
  }

  getFileDescription(fileName) {
    let fileNameSplitted = fileName.split('.')

    if (fileName.length > 0) {
      let extension = fileNameSplitted[fileNameSplitted.length - 1].toUpperCase()

      return extensions[extension]
    }

    return 'Unknown File'
  }

  determinFileIcon(fileName) {
    let fileNameSplitted = fileName.split('.')

    if (fileName.length > 0) {
      let extension = fileNameSplitted[fileNameSplitted.length - 1].toLowerCase()

      if (extension == 'pdf') {
        return '/assets/images/icons/pdf.png'
      } else if (extension == 'doc' || extension == 'docx') {
        return '/assets/images/icons/doc.png'
      } else if (extension == 'svg') {
        return '/assets/images/icons/svg.png'
      } else if (extension == 'xls' || extension == 'xlsx') {
        return '/assets/images/icons/xls.png'
      } else {
        return '/assets/images/icons/default.png'
      }
    }

    return '/assets/images/icons/default.png'
  }
}

export default new Utils()
