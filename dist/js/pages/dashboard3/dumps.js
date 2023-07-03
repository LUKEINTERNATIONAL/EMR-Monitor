function display_facility_dumps(data) {
  if(data.facility_dumps.length > 0){
    const totalSize = calculateTotalSize(data.facility_dumps);
    $('#dump_size').text(`${totalSize} (${data.facility_dumps.length}file)`)
    $('#dump_date').text(`${data.facility_dumps[0]['modified_date']}`)
  }
};
  
  
  
    function calculateTotalSize(dumps) {
    let totalBytes = 0;
  
    for (let dump of dumps) {
      const size = dump.dump_size;
      const unit = size.slice(-1); // Get the last character of the size (e.g., M, K, G, B)
  
      let bytes = parseFloat(size); // Convert the size to a number
  
      // Convert the size to bytes based on the unit
      if (unit === 'G') {
        bytes *= 1024 * 1024 * 1024;
      } else if (unit === 'M') {
        bytes *= 1024 * 1024;
      } else if (unit === 'K') {
        bytes *= 1024;
      }
  
      totalBytes += bytes;
    }
  
    // Convert the total size to the appropriate unit
    if (totalBytes >= 1024 * 1024 * 1024) { // 1 GB
      const totalGB = (totalBytes / (1024 * 1024 * 1024)).toFixed(2);
      return totalGB + ' GB';
    } else if (totalBytes >= 1024 * 1024) { // 1 MB
      const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
      return totalMB + ' MB';
    } else if (totalBytes >= 1024) { // 1 KB
      const totalKB = (totalBytes / 1024).toFixed(2);
      return totalKB + ' KB';
    } else {
      return totalBytes + ' bytes';
    }
  }