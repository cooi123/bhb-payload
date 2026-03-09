'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

import { fields } from '../Form/fields'
import { getClientSideURL } from '@/utilities/getURL'

type ContactUsBlockProps = {
  blockName?: string
  blockType?: 'contactUs'
  heading?: string
  subheading?: string
  formHeading?: string
  contactInfoHeading?: string
  form: string | FormType
  phoneNumber?: string
  email?: string
  address?: string
  mapEmbedUrl?: string
  backgroundColor?: 'primary' | 'secondary' | 'custom'
  customBackgroundColor?: string
}

type Props = {
  className?: string
  disableInnerContainer?: boolean
} & ContactUsBlockProps

const backgroundBackgroundClasses: Record<'primary' | 'secondary', string> = {
  primary: 'bg-[#D3D3D3] text-black',
  secondary: 'bg-[#E6E6E6] text-black',
}

export const ContactUsBlock: React.FC<Props> = ({
  className,
  disableInnerContainer,
  heading,
  subheading,
  formHeading,
  contactInfoHeading,
  form,
  phoneNumber,
  email,
  address,
  mapEmbedUrl,
  backgroundColor = 'primary',
  customBackgroundColor,
}) => {
  const defaultMapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d787.1373296698581!2d145.13445176970083!3d-37.894221139919686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66aac81e64ec7%3A0xd6609f6cd6b136b5!2s7%2F21-35%20Ricketts%20Rd%2C%20Mount%20Waverley%20VIC%203149!5e0!3m2!1sen!2sau!4v1773058550409!5m2!1sen!2sau'

  const formData = form as FormType

  const formMethods = useForm({
    defaultValues: formData?.fields || {},
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const formId = (form as FormType)?.id
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formId,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          const confirmationType = (form as FormType)?.confirmationType
          const redirect = (form as FormType)?.redirect

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formData],
  )

  const backgroundClasses =
    backgroundColor === 'custom'
      ? 'text-foreground bg-card'
      : cn(
          'text-foreground',
          backgroundBackgroundClasses[backgroundColor as 'primary' | 'secondary'],
        )

  const backgroundStyle =
    backgroundColor === 'custom' && customBackgroundColor
      ? { backgroundColor: customBackgroundColor }
      : undefined

  return (
    <div className={cn(backgroundClasses, className)} style={backgroundStyle}>
      <div className="container py-16 text-left">
        <div className="max-w-7xl mx-auto">
        {(heading || subheading) && (
          <div className="mb-12">
            {heading && (
              <h2 className="section-heading text-primary mb-2">{heading}</h2>
            )}
            {subheading && (
              <h3 className="section-heading text-primary">{subheading}</h3>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-7">
            {formHeading && (
              <h3 className="text-2xl font-serif text-primary mb-6">{formHeading}</h3>
            )}
            <div className="pb-6 pr-6 lg:pb-8 lg:pr-8">
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && formData?.confirmationType === 'message' && (
                  <RichText data={formData?.confirmationMessage} />
                )}
                {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
                {error && (
                  <div className="text-destructive mb-4">{`${error.status || '500'}: ${
                    error.message || ''
                  }`}</div>
                )}
                {!hasSubmitted && formData && (
                  <form
                    id={formData.id}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 [&_label]:text-primary [&_input]:border-0 [&_input]:border-b [&_input]:rounded-none [&_input]:px-0 [&_input]:bg-transparent [&_textarea]:rounded-none [&_textarea]:px-0 [&_textarea]:bg-transparent [&_select]:border-0 [&_select]:border-b [&_select]:rounded-none [&_select]:px-0 [&_select]:bg-transparent"
                  >
                    {formData.fields &&
                      formData.fields.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                        if (Field) {
                          return (
                            <div key={index}>
                              <Field
                                form={formData}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          )
                        }
                        return null
                      })}

                    <Button
                      form={formData.id}
                      type="submit"
                      variant="outline"
                      className="border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {formData.submitButtonLabel || 'Submit'}
                    </Button>
                  </form>
                )}
              </FormProvider>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="h-full w-px bg-border mx-auto" />
          </div>

          {/* Contact Info Section */}
          <div className="lg:col-span-4">
            {contactInfoHeading && (
              <h3 className="text-2xl font-serif text-primary mb-6">{contactInfoHeading}</h3>
            )}
            <div className="space-y-6">
              {phoneNumber && (
                <div>
                  <h4 className="text-lg font-light text-primary mb-2">Call us</h4>
                  <a
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
              )}

              {email && (
                <div>
                  <h4 className="text-lg font-light text-primary mb-2">Email us</h4>
                  <a
                    href={`mailto:${email}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              )}

              {address && (
                <div>
                  <h4 className="text-lg font-light text-primary mb-2">Visit us</h4>
                  <p className="text-foreground whitespace-pre-line">{address}</p>
                </div>
              )}

              {(mapEmbedUrl || defaultMapEmbedUrl) && (
                <div className="mt-8">
                  <div className="w-full aspect-[16/9] lg:aspect-[2/1] rounded-lg overflow-hidden">
                    <iframe
                      src={mapEmbedUrl || defaultMapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
