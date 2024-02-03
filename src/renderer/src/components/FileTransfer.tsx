import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


export const FileTransfer = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('')
  const [destinationLocation, setDestinationLocation] = useState<string>('')
  const [externalDevices, setExternalDevices] = useState<MediaDeviceInfo[]>([])

  useEffect(() => {
    const fetchExternalDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const externalDevicesList = devices.filter(
          (device) => device.kind === 'videoinput' && device.deviceId
        )
        setExternalDevices(externalDevicesList)
      } catch (error) {
        console.error('Error fetching external devices:', error)
      }
    }

    fetchExternalDevices()
  }, [])

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value)
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const folderPath = event.target.files?.[0]?.webkitRelativePath

    if (folderPath) {
      const folderPathArray = folderPath.split('/')
      folderPathArray.pop()
      const selectedFolder = folderPathArray.join('/')
      setDestinationLocation(selectedFolder)
      console.log(selectedFolder)
    }
  }

  const handleTransferClick = () => {
    // Implement file transfer logic here for .mp4 files based on selectedDevice and destinationLocation
    // Example: alert(`Transfer files to ${destinationLocation} using device ${selectedDevice}`);
  }

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="deviceSelect" className="form-label">
          Select Device:
        </label>
        <select
          className="form-select"
          id="deviceSelect"
          value={selectedDevice}
          onChange={handleDeviceChange}
        >
          <option value="">Select Device</option>
          {externalDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">
          Select Folderr:
        </label>
        <input
          type="file"
          id="fileInput"
          className="form-control"
          webkitdirectory=""
          onChange={handleFileSelect}
        />
      </div>

      <button type="button" className="btn btn-primary" onClick={handleTransferClick}>
        Transfer Files
      </button>
    </div>
  )
}
