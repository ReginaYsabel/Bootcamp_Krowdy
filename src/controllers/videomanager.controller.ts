import videoController from "./video.controller"
import videoManager from "./videomanagercontroller"
import {spawn} from 'child_process'
import fs from 'fs'
import path from 'path'
class VIDEOPROCESSCONTROLLER {
  
    async convert(originUrlVideo: string, videoId: any) {
        try {
            await videoController.createStatusProcessVideo('download', videoId)

            //const localPathVideo = await this.downloadFile("")

            await videoController.createStatusProcessVideo('validate', videoId)

            //const isValidFile = await this.validateFile("")

            //if(!isValidFile) throw new Error('Error en el archivo')

            const outputVideoPath = await this.createOuputPath()

            await videoController.createStatusProcessVideo('convert', videoId)

            await this.convertFile("C:/Users/yourUser/Downloads/inputvideoV2.webm", outputVideoPath)

            await videoController.createStatusProcessVideo('upload', videoId)

            const newOriginUrlVideoConvert = await this.uploadFile("C:/Users/yourUser/Downloads/Video/inputvideoV3.mp4")

            await videoController.createStatusProcessVideo('notified', videoId)

            this.logExecuteProcess(newOriginUrlVideoConvert)

            return {
                outputPath: newOriginUrlVideoConvert
            }
        } catch (error) {
            await videoController.createStatusProcessVideo('error', videoId)
            throw error
        }
    }

    async downloadFile(originUrlVideo: string) {
         
    }

    async validateFile(localPathVideo: string) {

    }

    async createOuputPath() {      
        try {            
            const folderName = '/Users/yourUser/Downloads/Video'
            const fileName='/inputvideoV3.mp4'
            if (!fs.existsSync(folderName)){
                fs.mkdirSync(folderName)
                const path1 =path.join(folderName,fileName)  
                return path1   
            }
        } catch (err) {
            throw err
            
        }       
    }

    async convertFile(localPathVideo: string, ouputPath: string) {
        try {
            videoManager.changeFormatVideo(localPathVideo)        
        } catch (error) {
            throw error
        }
    }

    async uploadFile(ouputPath: string) {
        try {
            var oldPath = "C:/Users/yourUser/Downloads/inputvideoV3.mp4"
            
            fs.rename(oldPath, ouputPath, function () {
                console.log('Successfully renamed')
            })
            return ouputPath
        } catch (error) {
            throw error
        }
    }

    logExecuteProcess(newOriginUrlVideoConvert: string) {
        console.log("🚀 ~ >>>>>>> newOriginUrlVideoConvert", newOriginUrlVideoConvert)
    }
}

export default new VIDEOPROCESSCONTROLLER()