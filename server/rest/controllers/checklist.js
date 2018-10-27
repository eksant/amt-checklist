const redis = require('redis')
const client = redis.createClient()

const { create, read, readId, readSelf, update, destroy } = require('../../models/checklist')
const { readMobilTangkiId } = require('../../models/mobiltangkis')

module.exports = {
  create: async (req, res) => {
    if (req.authUser.roles === 'Superadmin' || req.authUser.roles === 'Admin') {
      res.status(203).json({
        status: 203,
        message: 'You dont have authentication!',
      })
    } else {
      try {
        const objMobilTangki = await readMobilTangkiId(req.body.mobiltangkiId)

        if (objMobilTangki) {
          const data = await create({
            createdById: req.authUser._id,
            createdBy: req.authUser,
            // mobiltangki: req.body.mobiltangkiId,
            mobiltangkiId: req.body.mobiltangkiId,
            mobiltangki: objMobilTangki,
            status: req.body.status,
            ritase: req.body.ritase || null,
            odoKM: req.body.odoKM || null,
            HSSE: req.body.HSSE || null,
            PWSAMT: req.body.PWSAMT || null,
            TBBM: req.body.TBBM || null,
            remarks: req.body.remarks || null,
            imgUrl: req.body.imgUrl || null,
            kondisiRem: req.body.kondisiRem || null,
            kondisiRemReason: req.body.kondisiRemReason || null,
            kondisiBan: req.body.kondisiBan || null,
            kondisiBanReason: req.body.kondisiBanReason || null,
            kondisiWiper: req.body.kondisiWiper || null,
            kondisiWiperReason: req.body.kondisiWiperReason || null,
            kondisiLampu: req.body.kondisiLampu || null,
            kondisiLampuReason: req.body.kondisiLampuReason || null,
            kondisiKompartemen: req.body.kondisiKompartemen || null,
            kondisiKompartemenReason: req.body.kondisiKompartemenReason || null,
            kondisiApar: req.body.kondisiApar || null,
            kondisiAparReason: req.body.kondisiAparReason || null,
            kondisiOliMesin: req.body.kondisiOliMesin || null,
            kondisiOliMesinReason: req.body.kondisiOliMesinReason || null,
            kondisiAirRadiator: req.body.kondisiAirRadiator || null,
            kondisiAirRadiatorReason: req.body.kondisiAirRadiatorReason || null,
            keberadaanSTNK: req.body.keberadaanSTNK || null,
            keberadaanSTNKReason: req.body.keberadaanSTNKReason || null,
            keberadaanSuratKeur: req.body.keberadaanSuratKeur || null,
            keberadaanSuratKeurReason: req.body.keberadaanSuratKeurReason || null,
            keberadaanSuratTera: req.body.keberadaanSuratTera || null,
            keberadaanSuratTeraReason: req.body.keberadaanSuratTeraReason || null,
            keberadaanP3K: req.body.keberadaanP3K || null,
            keberadaanP3KReason: req.body.keberadaanP3KReason || null,
            keberadaanFlameTrap: req.body.keberadaanFlameTrap || null,
            keberadaanFlameTrapReason: req.body.keberadaanFlameTrapReason || null,
            keberadaanBanSerep: req.body.keberadaanBanSerep || null,
            keberadaanBanSerepReason: req.body.keberadaanBanSerepReason || null,
            keberadaanToolkit: req.body.keberadaanToolkit || null,
            keberadaanToolKitReason: req.body.keberadaanToolKitReason || null,
            keberadaanGroundingCable: req.body.keberadaanGroundingCable || null,
            keberadaanGroundingCableReason: req.body.keberadaanGroundingCableReason || null,
            keberadaanSelangBongkar: req.body.keberadaanSelangBongkar || null,
            keberadaanSelangBongkarReason: req.body.keberadaanSelangBongkarReason || null,
            keberadaanSpillKit: req.body.keberadaanSpillKit || null,
            keberadaanSpillKitReason: req.body.keberadaanSpillKitReason || null,
            membawaSIM: req.body.membawaSIM || null,
            membawaSIMReason: req.body.membawaSIMReason || null,
            membawaSuratIjinArea: req.body.membawaSuratIjinArea || null,
            membawaSuratIjinAreaReason: req.body.membawaSuratIjinAreaReason || null,
            membawaBukuSaku: req.body.membawaBukuSaku || null,
            membawaBukuSakuReason: req.body.membawaBukuSakuReason || null,
            membawaCatatanPerjalanan: req.body.membawaCatatanPerjalanan || null,
            membawaCatatanPerjalananReason: req.body.membawaCatatanPerjalananReason || null,
            menggunakanSeragam: req.body.menggunakanSeragam || null,
            menggunakanSeragamReason: req.body.menggunakanSeragamReason || null,
            menggunakanSafetyShoes: req.body.menggunakanSafetyShoes || null,
            menggunakanSafetyShoesReason: req.body.menggunakanSafetyShoesReason || null,
            menggunakanSafetyHelm: req.body.menggunakanSafetyHelm || null,
            menggunakanSafetyHelmReason: req.body.menggunakanSafetyHelmReason || null,
            menggunakanIDCard: req.body.menggunakanIDCard || null,
            menggunakanIDCardReason: req.body.menggunakanIDCardReason || null,
            menggunakanSarungTangan: req.body.menggunakanSarungTangan || null,
            menggunakanSarungTanganReason: req.body.menggunakanSarungTanganReason || null,
            menggunakanJasHujan: req.body.menggunakanJasHujan || null,
            menggunakanJamHujanReason: req.body.menggunakanJamHujanReason || null,
          })

          client.del('checklistCache')
          res.status(200).json({
            status: 200,
            message: 'Success to create record!',
            data,
          })
        }
      } catch (error) {
        res.status(400).json({
          status: 400,
          message: 'Bad request',
          error,
        })
      }
    }
  },

  read: async (req, res) => {
    try {
      // console.log('READ BY', req.authUser.roles)
      const data = await read()

      client.set('checklistCache', JSON.stringify(data), 'EX', 500)
      res.status(200).json({
        status: 200,
        message: 'Success to read records!',
        data,
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Bad request',
        error,
      })
    }
  },

  readSelf: async (req, res) => {
    try {
      // console.log('READ SELF BY', req.authUser.roles)
      const data = await readSelf(req.authUser._id)

      client.set('checklistCache', JSON.stringify(data), 'EX', 500)
      res.status(200).json({
        status: 200,
        message: 'Success to read records!',
        data,
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Bad request',
        error,
      })
    }
  },

  readById: async (req, res) => {
    try {
      const data = await readId(req.params.id)

      client.set('checklistCache', JSON.stringify(data), 'EX', 500)
      res.status(200).json({
        status: 200,
        message: 'Success to read record!',
        data,
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Bad request',
        error,
      })
    }
  },

  update: async (req, res) => {
    if (req.authUser.roles === 'Superadmin' || req.authUser.roles === 'Admin') {
      res.status(203).json({
        status: 203,
        message: 'You dont have authentication!',
      })
    } else {
      try {
        const checklist = await readId(req.params.id)

        if (checklist) {
          const itemData = {
            // user: req.authUser,
            // mobiltangki: req.body.mobiltangkiId,
            status: req.body.status,
            ritase: req.body.ritase || null,
            odoKM: req.body.odoKM || null,
            HSSE: req.body.HSSE || null,
            PWSAMT: req.body.PWSAMT || null,
            TBBM: req.body.TBBM || null,
            remarks: req.body.remarks || null,
            imgUrl: req.body.imgUrl || null,
            kondisiRem: req.body.kondisiRem || null,
            kondisiRemReason: req.body.kondisiRemReason || null,
            kondisiBan: req.body.kondisiBan || null,
            kondisiBanReason: req.body.kondisiBanReason || null,
            kondisiWiper: req.body.kondisiWiper || null,
            kondisiWiperReason: req.body.kondisiWiperReason || null,
            kondisiLampu: req.body.kondisiLampu || null,
            kondisiLampuReason: req.body.kondisiLampuReason || null,
            kondisiKompartemen: req.body.kondisiKompartemen || null,
            kondisiKompartemenReason: req.body.kondisiKompartemenReason || null,
            kondisiApar: req.body.kondisiApar || null,
            kondisiAparReason: req.body.kondisiAparReason || null,
            kondisiOliMesin: req.body.kondisiOliMesin || null,
            kondisiOliMesinReason: req.body.kondisiOliMesinReason || null,
            kondisiAirRadiator: req.body.kondisiAirRadiator || null,
            kondisiAirRadiatorReason: req.body.kondisiAirRadiatorReason || null,
            keberadaanSTNK: req.body.keberadaanSTNK || null,
            keberadaanSTNKReason: req.body.keberadaanSTNKReason || null,
            keberadaanSuratKeur: req.body.keberadaanSuratKeur || null,
            keberadaanSuratKeurReason: req.body.keberadaanSuratKeurReason || null,
            keberadaanSuratTera: req.body.keberadaanSuratTera || null,
            keberadaanSuratTeraReason: req.body.keberadaanSuratTeraReason || null,
            keberadaanP3K: req.body.keberadaanP3K || null,
            keberadaanP3KReason: req.body.keberadaanP3KReason || null,
            keberadaanFlameTrap: req.body.keberadaanFlameTrap || null,
            keberadaanFlameTrapReason: req.body.keberadaanFlameTrapReason || null,
            keberadaanBanSerep: req.body.keberadaanBanSerep || null,
            keberadaanBanSerepReason: req.body.keberadaanBanSerepReason || null,
            keberadaanToolkit: req.body.keberadaanToolkit || null,
            keberadaanToolKitReason: req.body.keberadaanToolKitReason || null,
            keberadaanGroundingCable: req.body.keberadaanGroundingCable || null,
            keberadaanGroundingCableReason: req.body.keberadaanGroundingCableReason || null,
            keberadaanSelangBongkar: req.body.keberadaanSelangBongkar || null,
            keberadaanSelangBongkarReason: req.body.keberadaanSelangBongkarReason || null,
            keberadaanSpillKit: req.body.keberadaanSpillKit || null,
            keberadaanSpillKitReason: req.body.keberadaanSpillKitReason || null,
            membawaSIM: req.body.membawaSIM || null,
            membawaSIMReason: req.body.membawaSIMReason || null,
            membawaSuratIjinArea: req.body.membawaSuratIjinArea || null,
            membawaSuratIjinAreaReason: req.body.membawaSuratIjinAreaReason || null,
            membawaBukuSaku: req.body.membawaBukuSaku || null,
            membawaBukuSakuReason: req.body.membawaBukuSakuReason || null,
            membawaCatatanPerjalanan: req.body.membawaCatatanPerjalanan || null,
            membawaCatatanPerjalananReason: req.body.membawaCatatanPerjalananReason || null,
            menggunakanSeragam: req.body.menggunakanSeragam || null,
            menggunakanSeragamReason: req.body.menggunakanSeragamReason || null,
            menggunakanSafetyShoes: req.body.menggunakanSafetyShoes || null,
            menggunakanSafetyShoesReason: req.body.menggunakanSafetyShoesReason || null,
            menggunakanSafetyHelm: req.body.menggunakanSafetyHelm || null,
            menggunakanSafetyHelmReason: req.body.menggunakanSafetyHelmReason || null,
            menggunakanIDCard: req.body.menggunakanIDCard || null,
            menggunakanIDCardReason: req.body.menggunakanIDCardReason || null,
            menggunakanSarungTangan: req.body.menggunakanSarungTangan || null,
            menggunakanSarungTanganReason: req.body.menggunakanSarungTanganReason || null,
            menggunakanJasHujan: req.body.menggunakanJasHujan || null,
            menggunakanJamHujanReason: req.body.menggunakanJamHujanReason || null,
          }

          const data = await update(checklist._id, itemData)
          client.del('checklistCache')
          res.status(200).json({
            status: 200,
            message: 'Success to update approval record!',
            data,
          })
        } else {
          res.status(200).json({
            status: 200,
            message: 'Data not found!',
          })
        }
      } catch (error) {
        res.status(400).json({
          status: 400,
          message: 'Bad request',
          error,
        })
      }
    }
  },

  approval: async (req, res) => {
    try {
      const checklist = await readId(req.params.id)

      if (checklist) {
        const itemData = {
          approvedById: req.authUser._id,
          approvedBy: req.authUser,
          status: req.body.status,
          rejectedReason: req.body.rejectedReason,
        }
        // console.log('item data', itemData)

        const data = await update(checklist._id, itemData)
        client.del('checklistCache')
        res.status(200).json({
          status: 200,
          message: 'Success to update record!',
          data,
        })
      } else {
        res.status(200).json({
          status: 200,
          message: 'Data not found!',
        })
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Bad request',
        error,
      })
    }
  },

  destroy: async (req, res) => {
    if (req.authUser.roles === 'Superadmin' || req.authUser.roles === 'Admin') {
      res.status(203).json({
        status: 203,
        message: 'You dont have authentication!',
      })
    } else {
      try {
        const data = await destroy(req.params.id)

        client.del('checklistCache')
        res.status(200).json({
          status: 200,
          message: 'Success to delete record!',
          data,
        })
      } catch (error) {
        res.status(400).json({
          status: 400,
          message: 'Bad request',
          error,
        })
      }
    }
  },
}
